import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
import { MOCK_PORTFOLIO_DATA, publicContent } from '../../js/data/mock-content.js';

test('mock content exposes expected portfolio sections', async () => {
  const [settings, projects, skills, education, socials] = await Promise.all([
    publicContent.getSettings(), publicContent.getProjects(), publicContent.getSkills(),
    publicContent.getEducation(), publicContent.getSocialLinks()
  ]);
  assert.equal(settings.personal_name, 'Rawan');
  assert.ok(projects.length > 0);
  assert.ok(skills.some((skill) => skill.name === 'HTML5'));
  assert.ok(education.length > 0);
  assert.ok(Array.isArray(socials));
});

test('mock content returns copies rather than mutable source references', async () => {
  const first = await publicContent.getProjects();
  first[0].title = 'Changed only in test';
  const second = await publicContent.getProjects();
  assert.notEqual(second[0].title, 'Changed only in test');
  assert.notEqual(MOCK_PORTFOLIO_DATA.projects[0].title, 'Changed only in test');
});

test('contact form validates input but clearly remains frontend-only', async () => {
  await assert.rejects(() => publicContent.submitContactMessage({ name: '', email: 'bad', subject: '', message: 'short' }));
  const result = await publicContent.submitContactMessage({ name: 'Demo Visitor', email: 'visitor@example.com', subject: 'Demo', message: 'This is a long enough demonstration message.' });
  assert.equal(result.demo, true);
  assert.equal(result.success, false);
  assert.match(result.message, /not sent or stored/i);
});


test('project case studies are complete, unique, and clearly labelled as concepts', async () => {
  const projects = await publicContent.getProjects();
  assert.equal(projects.length, 6);
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    assert.ok(project.category, `${project.slug} needs a category`);
    assert.ok(project.stage_label?.toLowerCase().includes('concept'), `${project.slug} should be labelled as a concept`);
    assert.ok(project.full_description?.length > 50, `${project.slug} needs a full description`);
    assert.ok(project.problem?.length > 20, `${project.slug} needs a problem statement`);
    assert.ok(project.solution?.length > 20, `${project.slug} needs a proposed solution`);
    assert.ok(project.role, `${project.slug} needs a role/focus description`);
    assert.ok(project.highlights?.length >= 3, `${project.slug} needs at least three highlights`);
    assert.ok(project.learning_outcome, `${project.slug} needs a learning outcome`);
    assert.ok(project.scope_note, `${project.slug} needs a scope disclaimer`);
    assert.equal(project.demo_url, '', 'sample projects must not imply a live demo');
    assert.equal(project.repo_url, '', 'sample projects must not imply a real source repository');
  }
});


test('every case study cover references an existing local asset', async () => {
  const projects = await publicContent.getProjects();
  for (const project of projects) {
    assert.match(project.cover_image_url, /^assets\/images\//, `${project.slug} should use a local image`);
    assert.equal(fs.existsSync(path.join(projectRoot, project.cover_image_url)), true, `${project.slug} cover is missing`);
  }
});
