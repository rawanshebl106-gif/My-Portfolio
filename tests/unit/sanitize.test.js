/**
 * Unit Tests: Sanitization and Security Validation
 * Run with: node --test tests/unit/sanitize.test.js
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  escapeHtml,
  isValidUrl,
  sanitizeUrl,
  isValidEmail,
  slugify,
  validateField
} from '../../js/core/sanitize.js';

test('escapeHtml prevents XSS payloads', () => {
  const payload1 = '<script>alert("XSS")</script>';
  assert.equal(escapeHtml(payload1), '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');

  const payload2 = '<img src="x" onerror="alert(1)">';
  assert.equal(escapeHtml(payload2), '&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;');

  const payload3 = 'Hello & "World" / \'Rawan\'';
  assert.equal(escapeHtml(payload3), 'Hello &amp; &quot;World&quot; &#x2F; &#x27;Rawan&#x27;');

  assert.equal(escapeHtml(null), '');
  assert.equal(escapeHtml(undefined), '');
});

test('isValidUrl strictly permits allowed protocols and rejects dangerous schemes', () => {
  // Allowed protocols
  assert.equal(isValidUrl('https://example.com/project'), true);
  assert.equal(isValidUrl('https://github.com/rawan'), true);
  assert.equal(isValidUrl('mailto:contact@example.com'), true);
  assert.equal(isValidUrl('tel:+1234567890'), true);
  assert.equal(isValidUrl('#projects'), true);
  assert.equal(isValidUrl('/projects/slug'), true);

  // Dangerous / Unsafe protocols MUST BE REJECTED
  assert.equal(isValidUrl('javascript:alert(1)'), false);
  assert.equal(isValidUrl('JAVASCRIPT:alert(document.cookie)'), false);
  assert.equal(isValidUrl('javascript:/*--></title></style>alert(1)'), false);
  assert.equal(isValidUrl('vbscript:msgbox(1)'), false);
  assert.equal(isValidUrl('data:text/html,<script>alert(1)</script>'), false);
  assert.equal(isValidUrl('file:///etc/passwd'), false);
  assert.equal(isValidUrl(''), false);
  assert.equal(isValidUrl(null), false);
});

test('sanitizeUrl returns safe URL or fallback', () => {
  assert.equal(sanitizeUrl('https://example.com'), 'https://example.com');
  assert.equal(sanitizeUrl('javascript:alert(1)'), '#');
  assert.equal(sanitizeUrl('data:text/html;base64,PHNjcmlwdD4=', '#custom'), '#custom');
});

test('isValidEmail correctly identifies valid and invalid email formats', () => {
  assert.equal(isValidEmail('rawan@example.com'), true);
  assert.equal(isValidEmail('test.dev@sub.domain.co'), true);
  assert.equal(isValidEmail('plainaddress'), false);
  assert.equal(isValidEmail('@missingusername.com'), false);
  assert.equal(isValidEmail('username@.com'), false);
  assert.equal(isValidEmail(''), false);
});

test('slugify produces valid SEO URL-friendly slugs', () => {
  assert.equal(slugify('Academia Student Hub'), 'academia-student-hub');
  assert.equal(slugify('Nova UI Component Library 2.0!'), 'nova-ui-component-library-20');
  assert.equal(slugify('   Leading & Trailing Whitespace --- '), 'leading-trailing-whitespace');
  assert.equal(slugify('Café & Résumé Project'), 'cafe-resume-project');
  assert.equal(slugify(''), '');
});

test('validateField validates constraints and returns clear messages', () => {
  const reqCheck = validateField('', { required: true });
  assert.equal(reqCheck.valid, false);
  assert.equal(reqCheck.error, 'This field is required.');

  const minCheck = validateField('abc', { minLength: 5 });
  assert.equal(minCheck.valid, false);
  assert.match(minCheck.error, /Must be at least 5 characters/);

  const maxCheck = validateField('1234567890', { maxLength: 5 });
  assert.equal(maxCheck.valid, false);
  assert.match(maxCheck.error, /Cannot exceed 5 characters/);

  const emailCheck = validateField('notanemail', { email: true });
  assert.equal(emailCheck.valid, false);

  const slugCheck = validateField('Invalid Slug!', { slug: true });
  assert.equal(slugCheck.valid, false);

  const validCheck = validateField('valid-slug-123', { required: true, slug: true });
  assert.equal(validCheck.valid, true);
  assert.equal(validCheck.error, null);
});



test('rejects protocol-relative URLs and control-character obfuscation', () => {
  assert.equal(isValidUrl('//attacker.example/path'), false);
  assert.equal(isValidUrl('\\\\attacker.example\\\\path'), false);
  assert.equal(isValidUrl('java' + String.fromCharCode(0) + 'script:alert(1)'), false);
});
