/**
 * Strict Input Validation and Sanitization Engine
 * Protects against XSS, injection attacks, malformed values, and enforces field constraints.
 */

// Maximum reasonable lengths for input fields
export const FIELD_LIMITS = {
  SHORT_TEXT: 100,
  MEDIUM_TEXT: 250,
  LONG_TEXT: 2000,
  EMAIL: 254,
  PHONE: 35,
  PASSWORD: 128,
  SALARY: 10000000,
  MAX_TAGS: 30,
  MAX_LANGUAGES: 15,
  MAX_EDUCATION: 10,
} as const;

/**
 * Strips script tags, HTML markup, dangerous URI protocols, and null bytes.
 * Trims and limits string length.
 */
export function sanitizeText(input: unknown, maxLength: number = FIELD_LIMITS.MEDIUM_TEXT): string {
  if (typeof input !== 'string') {
    if (input === null || input === undefined) return '';
    input = String(input);
  }

  let cleaned = (input as string)
    // Remove null bytes
    .replace(/\0/g, '')
    // Strip HTML/XML tags
    .replace(/<[^>]*>?/gm, '')
    // Remove dangerous inline JS protocols
    .replace(/javascript\s*:/gi, '')
    .replace(/vbscript\s*:/gi, '')
    .replace(/data\s*:\s*text\/html/gi, '')
    // Normalize excessive whitespace
    .replace(/[\r\n\t]+/g, ' ')
    .trim();

  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength).trim();
  }

  return cleaned;
}

/**
 * Validates and normalizes email addresses.
 */
export function sanitizeEmail(email: unknown): string {
  const cleaned = sanitizeText(email, FIELD_LIMITS.EMAIL).toLowerCase().trim();
  return cleaned;
}

export function validateEmailFormat(email: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeEmail(email);
  if (!sanitized) {
    return { isValid: false, error: 'Email address is required.' };
  }
  // RFC 5322 compliant regex pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(sanitized)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g. name@domain.com).' };
  }
  return { isValid: true };
}

/**
 * Validates password strength & security constraints.
 */
export function validatePasswordStrength(password: string): { isValid: boolean; error?: string } {
  if (!password || typeof password !== 'string') {
    return { isValid: false, error: 'Password is required.' };
  }
  if (password.length < 6) {
    return { isValid: false, error: 'Password must contain at least 6 characters.' };
  }
  if (password.length > FIELD_LIMITS.PASSWORD) {
    return { isValid: false, error: `Password cannot exceed ${FIELD_LIMITS.PASSWORD} characters.` };
  }
  if (/^\s+$/.test(password)) {
    return { isValid: false, error: 'Password cannot consist solely of whitespace.' };
  }
  return { isValid: true };
}

/**
 * Validates and sanitizes international phone numbers.
 * Restricts to + followed by 7-18 digits, spaces, dashes, or parentheses.
 */
export function sanitizePhone(phone: unknown): string {
  if (typeof phone !== 'string') return '';
  const cleaned = phone.replace(/[^0-9+\s\-()]/g, '').trim();
  return cleaned.slice(0, FIELD_LIMITS.PHONE);
}

export function validatePhoneFormat(phone: string): { isValid: boolean; error?: string } {
  if (!phone.trim()) return { isValid: true }; // optional
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 7 || digitsOnly.length > 16) {
    return { isValid: false, error: 'Please enter a valid phone number (7 to 15 digits).' };
  }
  return { isValid: true };
}

/**
 * Strictly sanitizes numbers within acceptable numeric ranges.
 */
export function sanitizeNumber(
  value: unknown, 
  min: number = 0, 
  max: number = FIELD_LIMITS.SALARY, 
  defaultVal: number = 0
): number {
  if (typeof value === 'number') {
    if (isNaN(value) || !isFinite(value)) return defaultVal;
    return Math.min(max, Math.max(min, Math.round(value)));
  }
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^0-9.-]/g, ''));
    if (isNaN(parsed) || !isFinite(parsed)) return defaultVal;
    return Math.min(max, Math.max(min, Math.round(parsed)));
  }
  return defaultVal;
}

/**
 * Sanitizes an array of strings (e.g. skills, certifications, target locations).
 */
export function sanitizeStringArray(
  arr: unknown, 
  maxItems: number = FIELD_LIMITS.MAX_TAGS, 
  maxItemLength: number = FIELD_LIMITS.SHORT_TEXT
): string[] {
  if (!Array.isArray(arr)) return [];
  const uniqueItems = new Set<string>();

  for (const item of arr) {
    if (typeof item === 'string') {
      const cleaned = sanitizeText(item, maxItemLength);
      if (cleaned.length > 0) {
        uniqueItems.add(cleaned);
      }
    }
    if (uniqueItems.size >= maxItems) break;
  }

  return Array.from(uniqueItems);
}

/**
 * Sanitizes URLs to prevent javascript: or malformed links.
 */
export function sanitizeUrl(url: unknown): string {
  if (typeof url !== 'string' || !url.trim()) return '';
  const trimmed = url.trim();
  // Allow only valid http, https, or relative paths
  if (/^(https?:\/\/|\/)/i.test(trimmed)) {
    return encodeURI(decodeURI(trimmed));
  }
  return '';
}

/**
 * Safe enum validation with optional default fallback.
 */
export function sanitizeEnum<T extends string>(
  value: unknown, 
  allowedValues: readonly T[], 
  defaultValue?: T
): T | undefined {
  if (typeof value === 'string' && allowedValues.includes(value as T)) {
    return value as T;
  }
  return defaultValue;
}
