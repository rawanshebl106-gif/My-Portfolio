import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const exists = (p) => fs.existsSync(path.join(root, p));
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) walk(rel, files);
    else files.push(rel);
  }
  return files;
}

test('private backend and admin directories are absent', () => {
  for (const p of ['admin', 'supabase', 'js/admin', 'js/services', 'js/config']) assert.equal(exists(p), false, `${p} must not ship`);
});

test('public page contains no admin portal link', () => {
  const html = read('index.html');
  assert.doesNotMatch(html, /href=["'][^"']*\/admin\/?["']/i);
  assert.doesNotMatch(html, /Admin Portal/i);
});

test('public source includes no Supabase endpoint or SDK import', () => {
  const sourceFiles = [...walk('js'), 'index.html', 'projects/index.html'];
  for (const file of sourceFiles) {
    const text = read(file);
    assert.doesNotMatch(text, /https?:\/\/[^\s"']+\.supabase\.co/i, `${file} contains a Supabase endpoint`);
    assert.doesNotMatch(text, /@supabase\/supabase-js/i, `${file} imports the Supabase SDK`);
  }
});

test('public JS has no JWT-shaped token or private key material', () => {
  for (const file of walk('js')) {
    const text = read(file);
    assert.doesNotMatch(text, /\beyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\b/, `${file} contains a JWT-shaped value`);
    const privateKeyMarker = [
      '-----BEGIN ',
      '(?:RSA |EC |OPENSSH |DSA )?',
      'PRIVATE KEY-----'
    ].join('');
    assert.doesNotMatch(text, new RegExp(privateKeyMarker), `${file} contains private key material`);
    assert.doesNotMatch(text, /service[_-]?role/i, `${file} references privileged service credentials`);
  }
});

test('contact submission is mock-only and does not invoke network APIs', () => {
  const source = read('js/data/mock-content.js');
  assert.match(source, /frontend-only demo/i);
  assert.doesNotMatch(source, /\bfetch\s*\(/i);
  assert.doesNotMatch(source, /XMLHttpRequest|@supabase\/supabase-js|supabase\.co|localStorage|sessionStorage/i);
});

test('no local real environment file is included in the package', () => {
  for (const name of ['.env', '.env.local', '.env.production', '.env.development', '.env.staging']) assert.equal(exists(name), false, `${name} must not be included`);
});


test('concept artwork is local and contains no scripts or remote references', () => {
  const covers = [
    'assets/images/concepts/codenest-learning-hub.svg',
    'assets/images/concepts/bloom-budget-planner.svg',
    'assets/images/concepts/freshcart-storefront.svg'
  ];
  for (const file of covers) {
    assert.equal(exists(file), true, `${file} must exist`);
    const svg = read(file);
    assert.doesNotMatch(svg, /<script\b|onload\s*=|javascript:|(?:href|src)\s*=\s*["\']https?:/i, `${file} must remain a static local image`);
  }
});

test('project filter controls and case-study disclosure are present', () => {
  const html = read('index.html');
  const app = read('js/portfolio/portfolio-app.js');
  assert.match(html, /id="project-filters"/);
  assert.match(html, /illustrative concept case studies/i);
  assert.match(app, /data-project-filter/);
  assert.match(app, /learning_outcome/);
  assert.match(app, /scope_note/);
});
