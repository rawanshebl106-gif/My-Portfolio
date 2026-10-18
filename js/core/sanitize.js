/**
 * Security and Sanitization Utilities
 * Robust XSS defense, URL scheme validation, input validation, and safe DOM construction.
 */

const HTML_ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;'
};

const HTML_ESCAPE_REGEX = /[&<>"'`\/]/g;

/**
 * Escapes unsafe HTML characters to prevent XSS.
 * @param {string|any} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(HTML_ESCAPE_REGEX, char => HTML_ESCAPES[char]);
}

/**
 * Validates a URL against an allowlist of protocols.
 * Strictly rejects javascript:, vbscript:, data:, and malformed URIs.
 * @param {string} url
 * @param {string[]} [allowedSchemes=['https', 'http', 'mailto', 'tel']]
 * @returns {boolean}
 */
export function isValidUrl(url, allowedSchemes = ['https', 'http', 'mailto', 'tel']) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.length === 0 || trimmed.length > 2048) return false;
  // Reject control characters and protocol-relative URLs (//host) to avoid ambiguous parsing.
  if (/[\u0000-\u001F\u007F]/.test(trimmed) || trimmed.startsWith('//') || trimmed.startsWith('\\')) return false;

  // Check for dangerous schemes
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:') || lower.startsWith('vbscript:') || lower.startsWith('data:')) {
    return false;
  }

  // Handle special mailto: and tel: schemes
  if (lower.startsWith('mailto:')) {
    const email = trimmed.slice(7).split('?')[0];
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (lower.startsWith('tel:')) {
    const phone = trimmed.slice(4);
    return /^[+0-9\s\-()]{3,25}$/.test(phone);
  }

  // Handle relative internal links and asset paths without allowing protocol-relative hosts.
  if (trimmed.startsWith('#') || trimmed.startsWith('/') || trimmed.startsWith('./') || trimmed.startsWith('../')) {
    return true;
  }
  if (!/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(trimmed) && /^[a-zA-Z0-9._/-]+(?:[?#][^\s]*)?$/.test(trimmed)) {
    return true;
  }

  try {
    const parsed = new URL(trimmed);
    const protocol = parsed.protocol.replace(':', '');
    return allowedSchemes.includes(protocol);
  } catch {
    return false;
  }
}

/**
 * Sanitizes a URL, returning a safe URL string or fallback.
 * @param {string} url
 * @param {string} [fallback='#']
 * @returns {string}
 */
export function sanitizeUrl(url, fallback = '#') {
  return isValidUrl(url) ? url.trim() : fallback;
}

/**
 * Validates email address format with safe regex.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(trimmed);
}

/**
 * Generates an SEO & URL-friendly slug from text.
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toString()
    .normalize('NFD') // Decompose combined graphemes
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove invalid chars
    .replace(/[\s_]+/g, '-') // Replace spaces/underscores with -
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
}

/**
 * Helper to safely construct a DOM element without innerHTML string vulnerabilities.
 * @param {string} tag
 * @param {object} [attributes={}]
 * @param {(string|Node|Array<string|Node>)} [children=[]]
 * @returns {HTMLElement}
 */
export function createSafeElement(tag, attributes = {}, children = []) {
  const el = document.createElement(tag);

  for (const [key, val] of Object.entries(attributes)) {
    if (val === undefined || val === null) continue;

    if (key === 'className' || key === 'class') {
      el.className = val;
    } else if (key === 'textContent') {
      el.textContent = val;
    } else if (key.startsWith('on') && typeof val === 'function') {
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, val);
    } else if (key === 'dataset' && typeof val === 'object') {
      Object.assign(el.dataset, val);
    } else if (key === 'style' && typeof val === 'object') {
      Object.assign(el.style, val);
    } else {
      el.setAttribute(key, String(val));
    }
  }

  const childList = Array.isArray(children) ? children : [children];
  for (const child of childList) {
    if (!child) continue;
    if (typeof child === 'string' || typeof child === 'number') {
      el.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  }

  return el;
}

/**
 * Multi-rule field validator.
 * @param {*} value
 * @param {object} rules
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateField(value, rules = {}) {
  const str = value !== null && value !== undefined ? String(value).trim() : '';

  if (rules.required && str.length === 0) {
    return { valid: false, error: rules.requiredMessage || 'This field is required.' };
  }

  if (str.length > 0) {
    if (rules.minLength && str.length < rules.minLength) {
      return { valid: false, error: `Must be at least ${rules.minLength} characters.` };
    }
    if (rules.maxLength && str.length > rules.maxLength) {
      return { valid: false, error: `Cannot exceed ${rules.maxLength} characters.` };
    }
    if (rules.email && !isValidEmail(str)) {
      return { valid: false, error: 'Please enter a valid email address.' };
    }
    if (rules.url && !isValidUrl(str, rules.allowedSchemes)) {
      return { valid: false, error: 'Please enter a valid and secure URL.' };
    }
    if (rules.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str)) {
      return { valid: false, error: 'Slug must consist of lowercase letters, numbers, and single hyphens.' };
    }
  }

  return { valid: true, error: null };
}
