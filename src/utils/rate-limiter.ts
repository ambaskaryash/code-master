import { NextRequest, NextResponse } from 'next/server';
import cache from 'memory-cache';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  keyGenerator?: (req: NextRequest) => string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private config: RateLimitConfig;
  
  constructor(config: RateLimitConfig) {
    this.config = {
      keyGenerator: (req) => this.getClientIp(req),
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      ...config
    };
  }

  private getClientIp(req: NextRequest): string {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    
    if (cfConnectingIp) return cfConnectingIp;
    if (realIp) return realIp;
    if (forwarded) return forwarded.split(',')[0].trim();
    
    return 'unknown';
  }

  private getCacheKey(req: NextRequest): string {
    const baseKey = this.config.keyGenerator!(req);
    const endpoint = req.nextUrl.pathname;
    return `rate_limit:${endpoint}:${baseKey}`;
  }

  async isAllowed(req: NextRequest): Promise<{ allowed: boolean; resetTime?: number; remaining?: number }> {
    const key = this.getCacheKey(req);
    const now = Date.now();
    const resetTime = now + this.config.windowMs;
    
    let rateLimitInfo: RateLimitInfo | null = cache.get(key);
    
    if (!rateLimitInfo || now > rateLimitInfo.resetTime) {
      // Reset or initialize rate limit info
      rateLimitInfo = {
        count: 1,
        resetTime
      };
      cache.put(key, rateLimitInfo, this.config.windowMs);
      
      return {
        allowed: true,
        resetTime,
        remaining: this.config.maxRequests - 1
      };
    }
    
    if (rateLimitInfo.count >= this.config.maxRequests) {
      return {
        allowed: false,
        resetTime: rateLimitInfo.resetTime,
        remaining: 0
      };
    }
    
    // Increment count
    rateLimitInfo.count++;
    cache.put(key, rateLimitInfo, rateLimitInfo.resetTime - now);
    
    return {
      allowed: true,
      resetTime: rateLimitInfo.resetTime,
      remaining: this.config.maxRequests - rateLimitInfo.count
    };
  }
}

// Pre-configured rate limiters for different endpoints
export const generalLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // Max 100 requests per 15 minutes per IP
});

export const authLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5 // Max 5 auth attempts per 15 minutes per IP
});

export const problemSubmissionLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10 // Max 10 submissions per minute per IP
});

export const apiLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30 // Max 30 API calls per minute per IP
});

// Middleware wrapper for easier use
export function withRateLimit(limiter: RateLimiter) {
  return async (req: NextRequest): Promise<NextResponse | null> => {
    const result = await limiter.isAllowed(req);
    
    if (!result.allowed) {
      const resetTime = new Date(result.resetTime || 0).toISOString();
      
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          message: 'You have exceeded the rate limit. Please try again later.',
          resetTime
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limiter['config'].maxRequests.toString(),
            'X-RateLimit-Remaining': (result.remaining || 0).toString(),
            'X-RateLimit-Reset': resetTime,
            'Retry-After': Math.ceil((result.resetTime! - Date.now()) / 1000).toString()
          }
        }
      );
    }
    
    return null; // Allow the request to proceed
  };
}

// DDoS detection - more aggressive limiting for suspicious patterns
export class DDoSProtection {
  private suspiciousThreshold = 50; // requests per minute
  private banDuration = 60 * 60 * 1000; // 1 hour
  
  async checkForDDoS(req: NextRequest): Promise<{ blocked: boolean; reason?: string }> {
    const ip = this.getClientIp(req);
    const key = `ddos:${ip}`;
    const now = Date.now();
    
    // Check if IP is already banned
    const banInfo = cache.get(`${key}:banned`);
    if (banInfo && now < banInfo.until) {
      return {
        blocked: true,
        reason: 'IP temporarily banned due to suspicious activity'
      };
    }
    
    // Count requests in the last minute
    const requestKey = `${key}:requests`;
    let requests: number[] = cache.get(requestKey) || [];
    
    // Remove requests older than 1 minute
    requests = requests.filter(timestamp => now - timestamp < 60 * 1000);
    requests.push(now);
    
    // Update cache
    cache.put(requestKey, requests, 60 * 1000);
    
    // Check if threshold exceeded
    if (requests.length > this.suspiciousThreshold) {
      // Ban the IP
      cache.put(`${key}:banned`, { until: now + this.banDuration }, this.banDuration);
      
      // Log the incident
      console.warn(`🚨 DDoS detected and IP banned: ${ip} (${requests.length} requests in 1 minute)`);
      
      return {
        blocked: true,
        reason: 'DDoS protection activated - IP banned'
      };
    }
    
    return { blocked: false };
  }
  
  private getClientIp(req: NextRequest): string {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    
    if (cfConnectingIp) return cfConnectingIp;
    if (realIp) return realIp;
    if (forwarded) return forwarded.split(',')[0].trim();
    
    return 'unknown';
  }
}

export const ddosProtection = new DDoSProtection();