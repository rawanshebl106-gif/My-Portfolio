/**
 * Lightweight, accessible Lucide-compatible SVG icon generator.
 * Provides clean inline SVG vector icons without external runtime dependencies.
 */

const ICONS = {
  'code': `<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>`,
  'palette': `<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.992 6.012 17.461 2 12 2z"></path>`,
  'terminal': `<polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line>`,
  'wrench': `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>`,
  'layout': `<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>`,
  'external-link': `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>`,
  'github': `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>`,
  'linkedin': `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>`,
  'twitter': `<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>`,
  'instagram': `<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>`,
  'facebook': `<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>`,
  'whatsapp': `<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>`,
  'mail': `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>`,
  'phone': `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>`,
  'check': `<polyline points="20 6 9 17 4 12"></polyline>`,
  'x': `<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`,
  'plus': `<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>`,
  'edit': `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>`,
  'trash': `<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>`,
  'eye': `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`,
  'upload': `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>`,
  'search': `<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>`,
  'filter': `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>`,
  'alert-circle': `<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>`,
  'log-out': `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>`,
  'refresh-cw': `<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>`,
  'user': `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>`,
  'settings': `<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>`,
  'folder': `<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>`,
  'graduation-cap': `<path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path>`,
  'arrow-up': `<line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>`,
  'menu': `<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>`,
  'share-2': `<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>`,
  'inbox': `<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>`,
  'image': `<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>`,
  'calendar': `<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>`,
  'copy': `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>`
};

/**
 * Returns an SVG string for the requested icon name.
 * @param {string} name
 * @param {object} [options]
 * @param {number} [options.size=20]
 * @param {string} [options.className='']
 * @param {string} [options.ariaLabel='']
 * @returns {string}
 */
export function getIconSvg(name, { size = 20, className = '', ariaLabel = '' } = {}) {
  const innerSvg = ICONS[name] || ICONS['code'];
  const a11yAttr = ariaLabel 
    ? `role="img" aria-label="${escapeAttr(ariaLabel)}"` 
    : `aria-hidden="true" focusable="false"`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon ${className}" ${a11yAttr}>${innerSvg}</svg>`;
}

function escapeAttr(text) {
  return String(text || '').replace(/"/g, '&quot;');
}


/**
 * Returns a compact brand-style mark for common technologies.
 * Only predefined SVG paths are returned; database content is used only for lookup.
 */
const TECHNOLOGY_MARKS = {
  html5: { className: 'html5', svg: '<path d="M3 2h18l-1.7 17L12 22l-7.3-3L3 2z"/><path d="M7 6h10l-.3 3H8l.2 2.5h8.2l-.6 5-3.8 1.2-3.7-1.2-.2-2.2" fill="none" stroke="#ffffff" stroke-width="1.25" stroke-linejoin="round"/>' },
  css3: { className: 'css3', svg: '<path d="M3 2h18l-1.7 17L12 22l-7.3-3L3 2z"/><path d="M7 6h10l-.3 3H8l.2 2.5h8.2l-.6 5-3.8 1.2-3.7-1.2-.2-2.2" fill="none" stroke="#ffffff" stroke-width="1.25" stroke-linejoin="round"/>' },
  javascript: { className: 'javascript', svg: '<rect x="2" y="2" width="20" height="20" rx="2"/><path d="M13 15.5c.2 1 1 1.6 2 1.6s1.7-.5 1.7-1.4V9.5M10.5 9.5v5.7c0 1.3-.7 2-1.8 2-.8 0-1.4-.4-1.7-1.1" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>' },
  typescript: { className: 'typescript', svg: '<rect x="2" y="2" width="20" height="20" rx="2"/><path d="M5.5 9h8M9.5 9v8M15 13.5c0-1 1-1.5 2-1.5.8 0 1.4.2 2 .6M14.8 16.7c.6.5 1.2.7 2 .7 1.1 0 1.9-.5 1.9-1.3 0-2-4-1-4-3.1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>' },
  figma: { className: 'figma', svg: '<path d="M12 12a4 4 0 1 1 4-4h-4z"/><path d="M8 0h4v8H8a4 4 0 1 1 0-8z" transform="translate(0 4)"/><path d="M12 12a4 4 0 1 0 4 4v-4z"/><circle cx="12" cy="8" r="4"/><circle cx="12" cy="16" r="4"/><path d="M8 12a4 4 0 1 1 0 8h4v-8z"/>' },
  github: { className: 'github', svg: '<path d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.7-1.3-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.2z"/>' },
  git: { className: 'git', svg: '<path d="M20.7 11.3 12.7 3.3a1 1 0 0 0-1.4 0L9.6 5l2.2 2.2a2.3 2.3 0 0 1 2.9 2.9l2.1 2.1a2.3 2.3 0 1 1-1.4 1.4l-2-2a2.3 2.3 0 0 1-2.9-2.9L8.3 6.9 3.3 11.9a1 1 0 0 0 0 1.4l8 8a1 1 0 0 0 1.4 0l8-8a1 1 0 0 0 0-2z"/>' },
  supabase: { className: 'supabase', svg: '<path d="M13.3 2.2 4.1 13.1a1 1 0 0 0 .8 1.6h6.2l-.6 7.1a.5.5 0 0 0 .9.3l9.2-11a1 1 0 0 0-.8-1.6h-6.2l.6-6.9a.5.5 0 0 0-.9-.4z"/>' },
  react: { className: 'react', svg: '<circle cx="12" cy="12" r="2.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" fill="none" stroke="currentColor" stroke-width="1.6"/>' },
  nodejs: { className: 'nodejs', svg: '<path d="M12 2 21 7v10l-9 5-9-5V7l9-5z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 9v6l3 2 3-2V9l-3-2-3 2z"/>' },
  python: { className: 'python', svg: '<path d="M12 2c-4 0-4 2-4 4v3h8v2H5c-2 0-3 2-3 4s1 5 4 5h3v-4c0-2 1-3 3-3h4c2 0 3-1 3-3V6c0-3-3-4-7-4z"/><circle cx="10" cy="5" r=".8" fill="#fff"/><path d="M12 22c4 0 4-2 4-4v-3H8v-2h11c2 0 3-2 3-4s-1-5-4-5h-3v4c0 2-1 3-3 3H8c-2 0-3 1-3 3v4c0 3 3 4 7 4z" opacity=".85"/>' },
  vscode: { className: 'vscode', svg: '<path d="m17.5 2 4 2v16l-4 2L5 12 2 14V10l3 2L17.5 2zM17 7 8 12l9 5V7z"/>' },
  database: { className: 'database', svg: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>' }
};

export function getTechnologyIconSvg(name) {
  const normalized = String(name || '').toLowerCase().trim();
  let key = 'code';
  if (normalized.includes('html')) key = 'html5';
  else if (normalized.includes('css')) key = 'css3';
  else if (normalized.includes('javascript') || normalized === 'js') key = 'javascript';
  else if (normalized.includes('typescript') || normalized === 'ts') key = 'typescript';
  else if (normalized.includes('figma') || normalized.includes('ui/ux') || normalized.includes('user interface') || normalized.includes('user experience')) key = 'figma';
  else if (normalized.includes('github')) key = 'github';
  else if (normalized === 'git' || normalized.includes('version control')) key = 'git';
  else if (normalized.includes('supabase')) key = 'supabase';
  else if (normalized.includes('react')) key = 'react';
  else if (normalized.includes('node')) key = 'nodejs';
  else if (normalized.includes('python')) key = 'python';
  else if (normalized.includes('vs code') || normalized.includes('vscode')) key = 'vscode';
  else if (normalized.includes('database') || normalized.includes('sql')) key = 'database';

  const mark = TECHNOLOGY_MARKS[key];
  if (!mark) return getIconSvg('code', { size: 22, className: 'technology-logo technology-logo--generic' });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" class="technology-logo technology-logo--${mark.className}" aria-hidden="true" focusable="false" fill="currentColor">${mark.svg}</svg>`;
}
