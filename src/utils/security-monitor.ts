import { NextRequest } from 'next/server';

export interface SecurityEvent {
  type: SecurityEventType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: number;
  clientIP: string;
  userAgent?: string;
  userId?: string;
  email?: string;
  endpoint?: string;
  message: string;
  metadata?: any;
  blocked?: boolean;
}

export enum SecurityEventType {
  // Authentication events
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGIN_BRUTE_FORCE = 'LOGIN_BRUTE_FORCE',
  
  // Registration events
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  REGISTRATION_SUSPICIOUS = 'REGISTRATION_SUSPICIOUS',
  
  // 2FA events
  TWO_FA_ENABLED = 'TWO_FA_ENABLED',
  TWO_FA_DISABLED = 'TWO_FA_DISABLED',
  TWO_FA_FAILURE = 'TWO_FA_FAILURE',
  
  // Rate limiting events
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  DDOS_DETECTED = 'DDOS_DETECTED',
  
  // Input validation events
  MALICIOUS_INPUT = 'MALICIOUS_INPUT',
  SQL_INJECTION_ATTEMPT = 'SQL_INJECTION_ATTEMPT',
  XSS_ATTEMPT = 'XSS_ATTEMPT',
  
  // Authorization events
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  PRIVILEGE_ESCALATION = 'PRIVILEGE_ESCALATION',
  
  // Data access events
  SENSITIVE_DATA_ACCESS = 'SENSITIVE_DATA_ACCESS',
  BULK_DATA_ACCESS = 'BULK_DATA_ACCESS',
  
  // System events
  SECURITY_RULE_VIOLATION = 'SECURITY_RULE_VIOLATION',
  ANOMALOUS_BEHAVIOR = 'ANOMALOUS_BEHAVIOR',
  
  // General security events
  SECURITY_SCAN_DETECTED = 'SECURITY_SCAN_DETECTED',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY'
}

export class SecurityMonitor {
  private static instance: SecurityMonitor;
  private events: SecurityEvent[] = [];
  private readonly MAX_EVENTS = 10000; // Keep last 10k events in memory
  
  static getInstance(): SecurityMonitor {
    if (!SecurityMonitor.instance) {
      SecurityMonitor.instance = new SecurityMonitor();
    }
    return SecurityMonitor.instance;
  }

  /**
   * Log a security event
   */
  logEvent(event: Partial<SecurityEvent> & { 
    type: SecurityEventType; 
    message: string; 
    clientIP: string 
  }): void {
    const securityEvent: SecurityEvent = {
      severity: 'MEDIUM',
      timestamp: Date.now(),
      blocked: false,
      ...event
    };

    // Add to memory store
    this.events.push(securityEvent);
    
    // Keep only recent events
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(-this.MAX_EVENTS);
    }

    // Console logging based on severity
    const logMessage = `🔒 SECURITY [${securityEvent.severity}] ${securityEvent.type}: ${securityEvent.message} (IP: ${securityEvent.clientIP})`;
    
    switch (securityEvent.severity) {
      case 'CRITICAL':
        console.error('🚨', logMessage, securityEvent);
        break;
      case 'HIGH':
        console.warn('⚠️', logMessage, securityEvent);
        break;
      case 'MEDIUM':
        console.warn('⚠️', logMessage);
        break;
      case 'LOW':
        console.info('ℹ️', logMessage);
        break;
    }

    // Send to external monitoring service (implement as needed)
    this.sendToMonitoringService(securityEvent);

    // Check for patterns that require immediate action
    this.analyzeEventPatterns(securityEvent);
  }

  /**
   * Log authentication success
   */
  logAuthSuccess(clientIP: string, email: string, userId: string): void {
    this.logEvent({
      type: SecurityEventType.LOGIN_SUCCESS,
      severity: 'LOW',
      clientIP,
      email,
      userId,
      message: `Successful login for user: ${email}`
    });
  }

  /**
   * Log authentication failure
   */
  logAuthFailure(clientIP: string, email: string, reason: string): void {
    this.logEvent({
      type: SecurityEventType.LOGIN_FAILURE,
      severity: 'MEDIUM',
      clientIP,
      email,
      message: `Failed login attempt for ${email}: ${reason}`,
      metadata: { reason }
    });

    // Check for brute force patterns
    this.checkBruteForcePattern(clientIP, email);
  }

  /**
   * Log rate limiting event
   */
  logRateLimit(clientIP: string, endpoint: string, userAgent?: string): void {
    this.logEvent({
      type: SecurityEventType.RATE_LIMIT_EXCEEDED,
      severity: 'HIGH',
      clientIP,
      endpoint,
      userAgent,
      message: `Rate limit exceeded for endpoint: ${endpoint}`,
      blocked: true
    });
  }

  /**
   * Log DDoS detection
   */
  logDDoSDetection(clientIP: string, requestCount: number): void {
    this.logEvent({
      type: SecurityEventType.DDOS_DETECTED,
      severity: 'CRITICAL',
      clientIP,
      message: `DDoS attack detected: ${requestCount} requests from IP`,
      metadata: { requestCount },
      blocked: true
    });
  }

  /**
   * Log malicious input detection
   */
  logMaliciousInput(clientIP: string, inputType: string, threats: string[], endpoint?: string): void {
    this.logEvent({
      type: SecurityEventType.MALICIOUS_INPUT,
      severity: 'HIGH',
      clientIP,
      endpoint,
      message: `Malicious input detected: ${threats.join(', ')}`,
      metadata: { inputType, threats },
      blocked: true
    });
  }

  /**
   * Log 2FA events
   */
  log2FAEvent(
    type: SecurityEventType.TWO_FA_ENABLED | SecurityEventType.TWO_FA_DISABLED | SecurityEventType.TWO_FA_FAILURE,
    clientIP: string,
    userId: string,
    email: string,
    details?: string
  ): void {
    const severity = type === SecurityEventType.TWO_FA_FAILURE ? 'MEDIUM' : 'LOW';
    
    this.logEvent({
      type,
      severity,
      clientIP,
      userId,
      email,
      message: `2FA ${type.toLowerCase().replace('_', ' ')}: ${email}${details ? ` (${details})` : ''}`
    });
  }

  /**
   * Get recent security events
   */
  getRecentEvents(limit: number = 100): SecurityEvent[] {
    return this.events.slice(-limit).reverse();
  }

  /**
   * Get events by type
   */
  getEventsByType(type: SecurityEventType, limit: number = 50): SecurityEvent[] {
    return this.events
      .filter(event => event.type === type)
      .slice(-limit)
      .reverse();
  }

  /**
   * Get events for specific IP
   */
  getEventsByIP(clientIP: string, limit: number = 50): SecurityEvent[] {
    return this.events
      .filter(event => event.clientIP === clientIP)
      .slice(-limit)
      .reverse();
  }

  /**
   * Get security statistics
   */
  getSecurityStats(): {
    totalEvents: number;
    criticalEvents: number;
    highSeverityEvents: number;
    blockedEvents: number;
    last24HoursEvents: number;
    topThreats: Array<{ type: SecurityEventType; count: number }>;
    topIPs: Array<{ ip: string; eventCount: number }>;
  } {
    const now = Date.now();
    const last24Hours = now - (24 * 60 * 60 * 1000);
    
    const criticalEvents = this.events.filter(e => e.severity === 'CRITICAL').length;
    const highSeverityEvents = this.events.filter(e => e.severity === 'HIGH').length;
    const blockedEvents = this.events.filter(e => e.blocked).length;
    const last24HoursEvents = this.events.filter(e => e.timestamp > last24Hours).length;

    // Count events by type
    const threatCounts = new Map<SecurityEventType, number>();
    const ipCounts = new Map<string, number>();

    this.events.forEach(event => {
      threatCounts.set(event.type, (threatCounts.get(event.type) || 0) + 1);
      ipCounts.set(event.clientIP, (ipCounts.get(event.clientIP) || 0) + 1);
    });

    const topThreats = Array.from(threatCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));

    const topIPs = Array.from(ipCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([ip, eventCount]) => ({ ip, eventCount }));

    return {
      totalEvents: this.events.length,
      criticalEvents,
      highSeverityEvents,
      blockedEvents,
      last24HoursEvents,
      topThreats,
      topIPs
    };
  }

  /**
   * Check for brute force login patterns
   */
  private checkBruteForcePattern(clientIP: string, email: string): void {
    const recentFailures = this.events.filter(event => 
      event.type === SecurityEventType.LOGIN_FAILURE &&
      event.clientIP === clientIP &&
      event.timestamp > (Date.now() - 15 * 60 * 1000) // Last 15 minutes
    );

    if (recentFailures.length >= 5) {
      this.logEvent({
        type: SecurityEventType.LOGIN_BRUTE_FORCE,
        severity: 'CRITICAL',
        clientIP,
        email,
        message: `Brute force attack detected: ${recentFailures.length} failed attempts`,
        metadata: { failureCount: recentFailures.length },
        blocked: true
      });
    }
  }

  /**
   * Analyze event patterns for anomalies
   */
  private analyzeEventPatterns(newEvent: SecurityEvent): void {
    // Look for rapid successive events from same IP
    const recentEvents = this.events.filter(event =>
      event.clientIP === newEvent.clientIP &&
      event.timestamp > (Date.now() - 60 * 1000) // Last minute
    );

    if (recentEvents.length > 30) {
      this.logEvent({
        type: SecurityEventType.ANOMALOUS_BEHAVIOR,
        severity: 'HIGH',
        clientIP: newEvent.clientIP,
        message: `Anomalous behavior detected: ${recentEvents.length} events in 1 minute`,
        metadata: { eventCount: recentEvents.length }
      });
    }
  }

  /**
   * Send event to external monitoring service
   */
  private sendToMonitoringService(event: SecurityEvent): void {
    // Implement integration with monitoring services like:
    // - Datadog
    // - New Relic
    // - Splunk
    // - ELK Stack
    // - Custom webhook endpoints

    // Example webhook call (commented out):
    /*
    if (event.severity === 'CRITICAL') {
      fetch('https://your-monitoring-webhook.com/security-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(error => {
        console.error('Failed to send security event to monitoring service:', error);
      });
    }
    */
  }

  /**
   * Clear old events (cleanup method)
   */
  cleanupOldEvents(): void {
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const initialLength = this.events.length;
    
    this.events = this.events.filter(event => event.timestamp > oneWeekAgo);
    
    const removedCount = initialLength - this.events.length;
    if (removedCount > 0) {
      console.info(`🧹 Security Monitor: Cleaned up ${removedCount} old security events`);
    }
  }

  /**
   * Create security event from request
   */
  static createEventFromRequest(
    req: NextRequest,
    type: SecurityEventType,
    message: string,
    additionalData?: Partial<SecurityEvent>
  ): Partial<SecurityEvent> & { type: SecurityEventType; message: string; clientIP: string } {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    
    let clientIP = 'unknown';
    if (cfConnectingIp) clientIP = cfConnectingIp;
    else if (realIp) clientIP = realIp;
    else if (forwarded) clientIP = forwarded.split(',')[0].trim();

    return {
      type,
      message,
      clientIP,
      userAgent: req.headers.get('user-agent') || undefined,
      endpoint: req.nextUrl.pathname,
      ...additionalData
    };
  }
}

// Export singleton instance
export const securityMonitor = SecurityMonitor.getInstance();

// Cleanup old events every hour
if (typeof window === 'undefined') { // Server-side only
  setInterval(() => {
    securityMonitor.cleanupOldEvents();
  }, 60 * 60 * 1000); // 1 hour
}