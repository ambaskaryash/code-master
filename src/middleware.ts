import { NextRequest, NextResponse } from 'next/server';
import { 
  generalLimiter, 
  authLimiter, 
  problemSubmissionLimiter, 
  apiLimiter,
  withRateLimit,
  ddosProtection 
} from '@/utils/rate-limiter';
import { securityMonitor, SecurityEventType } from '@/utils/security-monitor';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply DDoS protection to all routes
  const ddosCheck = await ddosProtection.checkForDDoS(request);
  if (ddosCheck.blocked) {
    // Log DDoS detection
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     request.headers.get('cf-connecting-ip') || 
                     'unknown';
    
    securityMonitor.logDDoSDetection(clientIP, 50); // Approximate request count
    
    console.warn(`🚨 Blocked request due to DDoS protection: ${clientIP} - ${ddosCheck.reason}`);
    return new NextResponse(
      JSON.stringify({
        error: 'Access Denied',
        message: ddosCheck.reason,
        code: 'DDOS_PROTECTION'
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-Security-Block': 'DDoS Protection'
        }
      }
    );
  }

  // Apply specific rate limiting based on route
  let rateLimitResponse: NextResponse | null = null;

  // Authentication routes - strict limiting
  if (pathname.startsWith('/api/auth') || 
      pathname.includes('/login') || 
      pathname.includes('/signup') ||
      pathname.includes('/verify-2fa')) {
    rateLimitResponse = await withRateLimit(authLimiter)(request);
  }
  
  // Problem submission routes - moderate limiting
  else if (pathname.includes('/submit') || 
           pathname.includes('/run-code') ||
           pathname.startsWith('/api/problems/submit')) {
    rateLimitResponse = await withRateLimit(problemSubmissionLimiter)(request);
  }
  
  // API routes - moderate limiting
  else if (pathname.startsWith('/api/')) {
    rateLimitResponse = await withRateLimit(apiLimiter)(request);
  }
  
  // General pages - lenient limiting
  else {
    rateLimitResponse = await withRateLimit(generalLimiter)(request);
  }

  // If rate limited, return the rate limit response
  if (rateLimitResponse) {
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     request.headers.get('cf-connecting-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || undefined;
    
    securityMonitor.logRateLimit(clientIP, pathname, userAgent);
    console.warn(`⚠️ Rate limited: ${clientIP} on ${pathname}`);
    return rateLimitResponse;
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  
  // Enhanced Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.youtube.com https://www.youtube.com https://*.firebaseapp.com https://*.gstatic.com blob: data:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.gstatic.com",
    "font-src 'self' https://fonts.gstatic.com https://*.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https://*.youtube.com https://www.youtube.com blob:",
    "frame-src 'self' https://*.youtube.com https://www.youtube.com",
    "connect-src 'self' https://*.firebaseapp.com https://*.googleapis.com wss://*.firebaseio.com https://*.firestore.googleapis.com https://*.identitytoolkit.googleapis.com",
    "worker-src 'self' blob: data:",
    "child-src 'self' https://*.youtube.com blob:",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "upgrade-insecure-requests"
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);

  // HSTS (HTTP Strict Transport Security)
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  return response;
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};