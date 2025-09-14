import Joi from 'joi';
import DOMPurify from 'isomorphic-dompurify';
import validator from 'validator';
import xss from 'xss';

// Custom validation schemas
export const validationSchemas = {
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .max(254)
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.max': 'Email must be less than 254 characters',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'))
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must be less than 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    }),

  displayName: Joi.string()
    .min(2)
    .max(50)
    .pattern(new RegExp('^[a-zA-Z0-9_\\s]+$'))
    .required()
    .messages({
      'string.min': 'Display name must be at least 2 characters long',
      'string.max': 'Display name must be less than 50 characters',
      'string.pattern.base': 'Display name can only contain letters, numbers, underscores, and spaces',
      'any.required': 'Display name is required'
    }),

  problemId: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.alphanum': 'Problem ID can only contain letters and numbers',
      'string.min': 'Problem ID must be at least 3 characters long',
      'string.max': 'Problem ID must be less than 50 characters',
      'any.required': 'Problem ID is required'
    }),

  code: Joi.string()
    .max(10000)
    .required()
    .messages({
      'string.max': 'Code must be less than 10,000 characters',
      'any.required': 'Code is required'
    }),

  twoFactorCode: Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      'string.length': '2FA code must be exactly 6 digits',
      'string.pattern.base': '2FA code must contain only numbers',
      'any.required': '2FA code is required'
    })
};

// Security validation class
export class SecurityValidator {
  
  // Validate input data against schema
  static validateInput<T>(data: any, schema: Joi.Schema): { isValid: boolean; error?: string; data?: T } {
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: false
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message).join('; ');
      return { isValid: false, error: errorMessages };
    }

    return { isValid: true, data: value as T };
  }

  // Sanitize HTML content to prevent XSS
  static sanitizeHtml(input: string): string {
    if (typeof input !== 'string') return '';
    
    // First pass with DOMPurify
    const purified = DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'code', 'pre'],
      ALLOWED_ATTR: [],
      FORBID_TAGS: ['script', 'object', 'embed', 'link', 'style', 'img', 'svg'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'style']
    });

    // Second pass with xss library
    return xss(purified, {
      whiteList: {
        b: [],
        i: [],
        em: [],
        strong: [],
        code: [],
        pre: []
      },
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script'],
      css: false
    });
  }

  // Sanitize user input for database storage
  static sanitizeUserInput(input: string): string {
    if (typeof input !== 'string') return '';
    
    return validator.escape(
      validator.stripLow(
        validator.trim(input)
      )
    );
  }

  // Validate and sanitize email
  static validateEmail(email: string): { isValid: boolean; sanitized?: string; error?: string } {
    if (typeof email !== 'string') {
      return { isValid: false, error: 'Email must be a string' };
    }

    const sanitized = validator.normalizeEmail(validator.trim(email.toLowerCase()), {
      gmail_lowercase: true,
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      outlookdotcom_lowercase: true,
      outlookdotcom_remove_subaddress: false,
      yahoo_lowercase: true,
      yahoo_remove_subaddress: false,
      icloud_lowercase: true,
      icloud_remove_subaddress: false
    }) || '';

    if (!validator.isEmail(sanitized)) {
      return { isValid: false, error: 'Invalid email format' };
    }

    if (sanitized.length > 254) {
      return { isValid: false, error: 'Email is too long' };
    }

    return { isValid: true, sanitized };
  }

  // Check for potentially malicious patterns
  static detectMaliciousPatterns(input: string): { isSafe: boolean; threats: string[] } {
    if (typeof input !== 'string') return { isSafe: true, threats: [] };

    const threats: string[] = [];
    
    // SQL Injection patterns (even though we use Firebase, good to check)
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi,
      /(\'|\")(\s*;\s*|\s*--|\s*\/\*)/gi,
      /(\bEXEC\s*\()/gi
    ];

    sqlPatterns.forEach(pattern => {
      if (pattern.test(input)) {
        threats.push('Potential SQL injection pattern detected');
      }
    });

    // XSS patterns
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<img[^>]+src[\\s]*=[\\s]*[\\"\\\'][\\s]*javascript:/gi
    ];

    xssPatterns.forEach(pattern => {
      if (pattern.test(input)) {
        threats.push('Potential XSS pattern detected');
      }
    });

    // Code injection patterns
    const codeInjectionPatterns = [
      /eval\s*\(/gi,
      /Function\s*\(/gi,
      /setTimeout\s*\(/gi,
      /setInterval\s*\(/gi,
      /document\.write/gi,
      /innerHTML/gi
    ];

    codeInjectionPatterns.forEach(pattern => {
      if (pattern.test(input)) {
        threats.push('Potential code injection pattern detected');
      }
    });

    return {
      isSafe: threats.length === 0,
      threats
    };
  }

  // Rate limiting for specific user actions
  static checkUserActionRate(userId: string, action: string, maxActions: number = 10, windowMinutes: number = 1): boolean {
    // This would integrate with your rate limiting system
    // Implementation depends on your caching strategy
    return true; // Placeholder
  }

  // Validate Firebase document ID
  static validateFirebaseDocId(id: string): boolean {
    if (typeof id !== 'string') return false;
    
    // Firebase document IDs cannot be empty, contain certain characters, or exceed length
    const validPattern = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
    return id.length > 0 && id.length <= 1500 && validPattern.test(id);
  }

  // Comprehensive validation for user registration
  static validateRegistration(data: any): { 
    isValid: boolean; 
    errors: string[]; 
    sanitizedData?: { email: string; displayName: string; password: string } 
  } {
    const errors: string[] = [];
    
    // Validate email
    const emailValidation = this.validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.push(emailValidation.error!);
    }

    // Validate password
    const passwordValidation = this.validateInput(data, Joi.object({ password: validationSchemas.password }));
    if (!passwordValidation.isValid) {
      errors.push(passwordValidation.error!);
    }

    // Validate display name
    const displayNameValidation = this.validateInput(data, Joi.object({ displayName: validationSchemas.displayName }));
    if (!displayNameValidation.isValid) {
      errors.push(displayNameValidation.error!);
    }

    // Check for malicious patterns
    const maliciousCheck = this.detectMaliciousPatterns(data.displayName + ' ' + data.email);
    if (!maliciousCheck.isSafe) {
      errors.push('Input contains potentially harmful content');
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return {
      isValid: true,
      errors: [],
      sanitizedData: {
        email: emailValidation.sanitized!,
        displayName: this.sanitizeUserInput(data.displayName),
        password: data.password // Don't sanitize password, just validate
      }
    };
  }
}

// Middleware function for API route validation
export function validateApiInput(schema: Joi.Schema) {
  return (handler: any) => {
    return async (req: any, res: any) => {
      const validation = SecurityValidator.validateInput(req.body, schema);
      
      if (!validation.isValid) {
        return res.status(400).json({
          error: 'Validation failed',
          message: validation.error,
          timestamp: new Date().toISOString()
        });
      }

      req.validatedBody = validation.data;
      return handler(req, res);
    };
  };
}