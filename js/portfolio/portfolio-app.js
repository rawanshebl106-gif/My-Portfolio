/**
 * Public Portfolio Application Controller
 * Handles dynamic content fetching, accessibility, navigation, modal routing, and contact form.
 */

import { publicContent } from '../data/mock-content.js';
import { Typewriter } from '../components/typewriter.js';
import { Modal } from '../components/modal.js';
import { toast } from '../components/toast.js';
import { getIconSvg, getTechnologyIconSvg } from '../core/icons.js';
import { escapeHtml, sanitizeUrl, isValidEmail } from '../core/sanitize.js';

class PortfolioApp {
  constructor() {
    this.settings = null;
    this.projects = [];
    this.skills = [];
    this.education = [];
    this.socials = [];
    this.projectModal = null;
    this.typewriter = null;
    this.activeProjectFilter = 'All';
  }

  async init() {
    try {
      this.initNavigation();
      this.initBackToTop();
      this.initProjectModal();
      this.initContactForm();

      // Load local mock data for the frontend-only academic showcase
      await this.loadAllContent();

      // Check deep link query parameter (e.g. ?project=academia-student-hub)
      this.handleInitialRoute();
    } catch (err) {
      console.error('Initialization error:', err);
    }
  }

  async loadAllContent() {
    try {
      const [settings, projects, skills, education, socials] = await Promise.all([
        publicContent.getSettings(),
        publicContent.getProjects(),
        publicContent.getSkills(),
        publicContent.getEducation(),
        publicContent.getSocialLinks()
      ]);

      this.settings = settings;
      this.projects = projects;
      this.skills = skills;
      this.education = education;
      this.socials = socials;

      this.renderBrandingAndTheme();
      this.renderHero();
      this.renderAbout();
      this.renderSkills();
      this.renderProjects();
      this.renderContact();
      this.renderFooter();
      this.initScrollReveal();
    } catch (err) {
      console.error('Failed to load portfolio content:', err);
    }
  }

  /* ==========================================================================
     Branding, Theme, and Navigation
     ========================================================================== */
  renderBrandingAndTheme() {
    if (!this.settings) return;

    // Document Title & Meta Description
    if (this.settings.browser_title) {
      document.title = this.settings.browser_title;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && this.settings.meta_description) {
      metaDesc.setAttribute('content', this.settings.meta_description);
    }

    // Configurable Accent Color
    if (typeof this.settings.accent_color === 'string' && /^#(?:[a-f0-9]{3}|[a-f0-9]{6})$/i.test(this.settings.accent_color)) {
      document.documentElement.style.setProperty('--color-accent', this.settings.accent_color);
    }

    // Brand Logo or Monogram
    const brandContainer = document.getElementById('header-brand');
    const brandName = this.settings.brand_name || 'Rawan';
    if (brandContainer) {
      const safeLogoUrl = sanitizeUrl(this.settings.logo_url || '', '');
      if (safeLogoUrl) {
        brandContainer.innerHTML = `
          <img src="${escapeHtml(safeLogoUrl)}" alt="${escapeHtml(brandName)}" class="brand-logo-img">
          <span>${escapeHtml(brandName)}</span>
        `;
      } else {
        brandContainer.innerHTML = `
          <div class="brand-monogram">R</div>
          <span>${escapeHtml(brandName)}</span>
        `;
      }
    }

    // Section Visibility Toggles
    const vis = this.settings.section_visibility || {};
    const toggleSection = (id, visible) => {
      const sec = document.getElementById(id);
      const navLink = document.querySelector(`a[href="#${id}"]`);
      if (sec) sec.style.display = visible === false ? 'none' : '';
      if (navLink) navLink.style.display = visible === false ? 'none' : '';
    };

    toggleSection('about', vis.about);
    toggleSection('skills', vis.skills);
    toggleSection('projects', vis.projects);
    toggleSection('contact', vis.contact);
  }

  initNavigation() {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');

    // Sticky Scroll Effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header?.classList.add('is-scrolled');
      } else {
        header?.classList.remove('is-scrolled');
      }
    }, { passive: true });

    // Mobile Menu Toggle
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
        mobileDrawer.classList.toggle('is-open');
        mobileToggle.innerHTML = isExpanded 
          ? getIconSvg('menu', { size: 22 })
          : getIconSvg('x', { size: 22 });
      });

      // Close mobile menu when clicking a navigation link
      mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('is-open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.innerHTML = getIconSvg('menu', { size: 22 });
        });
      });
    }

    // Active Section IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(sec => observer.observe(sec));
  }

  initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ==========================================================================
     Hero Section
     ========================================================================== */
  renderHero() {
    if (!this.settings) return;

    // Portrait image
    const portraitImg = document.getElementById('hero-portrait');
    if (portraitImg) {
      portraitImg.src = sanitizeUrl(this.settings.portrait_url || 'assets/images/portrait-placeholder.jpg', 'assets/images/portrait-placeholder.jpg');
      portraitImg.alt = `${this.settings.personal_name || 'Rawan'} - Web Developer`;
    }

    // Eyebrow and Headline
    const eyebrow = document.getElementById('hero-eyebrow');
    if (eyebrow) eyebrow.textContent = this.settings.hero_eyebrow || 'WEB DEVELOPER';

    const headline = document.getElementById('hero-headline');
    if (headline) headline.textContent = this.settings.hero_headline || 'Rawan';

    const intro = document.getElementById('hero-intro');
    if (intro) intro.textContent = this.settings.hero_intro;

    // Typewriter Rotating Phrases
    const typewriterEl = document.getElementById('hero-typewriter-text');
    if (typewriterEl) {
      const phrases = Array.isArray(this.settings.hero_phrases) && this.settings.hero_phrases.length > 0
        ? this.settings.hero_phrases
        : ['I am a Web Developer', 'I am a UI/UX Enthusiast', 'I am a Frontend Developer', 'I am a Problem Solver'];

      if (this.typewriter) {
        this.typewriter.updatePhrases(phrases);
      } else {
        this.typewriter = new Typewriter(typewriterEl, phrases, {
          typeSpeed: 65,
          deleteSpeed: 35,
          pauseEnd: 1800
        });
        this.typewriter.start();
      }
    }

    // Hero Social Links
    this.renderSocialLinks('hero-socials');
  }

  renderSocialLinks(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!this.socials || this.socials.length === 0) {
      container.innerHTML = '';
      return;
    }

    const platformIcons = {
      'github': 'github',
      'linkedin': 'linkedin',
      'x': 'twitter',
      'twitter': 'twitter',
      'instagram': 'instagram',
      'facebook': 'facebook',
      'whatsapp': 'whatsapp',
      'email': 'mail',
      'phone': 'phone'
    };

    container.innerHTML = this.socials.map(soc => {
      const lower = soc.platform.toLowerCase();
      const iconName = platformIcons[lower] || 'external-link';
      const safeUrl = sanitizeUrl(soc.url);
      const isExternal = safeUrl.startsWith('http');
      const relAttr = isExternal ? 'rel="noopener noreferrer" target="_blank"' : '';

      return `
        <a href="${escapeHtml(safeUrl)}" class="social-btn" title="${escapeHtml(soc.platform)}" aria-label="${escapeHtml(soc.platform)}" ${relAttr}>
          ${getIconSvg(iconName, { size: 18 })}
        </a>
      `;
    }).join('');
  }

  /* ==========================================================================
     About Me & Education
     ========================================================================== */
  renderAbout() {
    if (!this.settings) return;

    const bioContainer = document.getElementById('about-bio-paragraphs');
    if (bioContainer) {
      const paragraphs = [
        this.settings.about_text_p1,
        this.settings.about_text_p2,
        this.settings.about_text_p3,
        this.settings.about_text_p4
      ].filter(Boolean);

      bioContainer.innerHTML = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
    }

    // Education entries
    const eduContainer = document.getElementById('about-education-container');
    if (eduContainer) {
      if (!this.education || this.education.length === 0) {
        eduContainer.innerHTML = `
          <div class="education-card">
            <div class="education-title">Management Information Systems</div>
            <div class="education-specialization">Information Systems Track</div>
            <div class="badge badge-accent">Expected graduation: 2027</div>
          </div>
        `;
        return;
      }

      eduContainer.innerHTML = this.education.map(edu => `
        <div class="education-card">
          <div class="education-header">
            <div>
              <div class="education-title">${escapeHtml(edu.qualification)}</div>
              <div class="education-specialization">${escapeHtml(edu.specialization)}</div>
            </div>
            <div class="education-icon-box">
              ${getIconSvg('graduation-cap', { size: 24 })}
            </div>
          </div>
          <div class="education-meta">
            ${edu.institution && !['university', 'not specified'].includes(String(edu.institution).trim().toLowerCase()) ? `
              <span class="education-meta-item">
                ${getIconSvg('layout', { size: 14 })} ${escapeHtml(edu.institution)}
              </span>
            ` : ''}
            <span class="badge badge-accent">
              ${escapeHtml(edu.status || 'Expected graduation: 2027')}
            </span>
          </div>
          ${edu.description ? `<div class="education-note">${escapeHtml(edu.description)}</div>` : ''}
        </div>
      `).join('');
    }
  }

  /* ==========================================================================
     Skills & Technologies
     ========================================================================== */
  renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    if (!this.skills || this.skills.length === 0) {
      grid.innerHTML = `<div class="empty-state"><p>No skills published yet.</p></div>`;
      return;
    }

    const categories = {};
    this.skills.forEach(skill => {
      const cat = skill.category || 'General';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(skill);
    });

    const categoryIcons = {
      'Frontend': 'code',
      'UI/UX': 'palette',
      'Backend': 'terminal',
      'Tools': 'wrench'
    };

    grid.innerHTML = Object.entries(categories).map(([category, items]) => {
      const iconName = categoryIcons[category] || 'code';
      const chipsHtml = items.map(skill => `
        <div class="skill-chip">
          <span class="skill-chip-logo" aria-hidden="true">${getTechnologyIconSvg(skill.name)}</span>
          <span class="skill-chip-copy">
            <span class="skill-chip-name">${escapeHtml(skill.name)}</span>
            ${skill.description ? `<span class="skill-chip-description">${escapeHtml(skill.description)}</span>` : ''}
          </span>
          ${skill.proficiency_label ? `<span class="skill-chip-prof">${escapeHtml(skill.proficiency_label)}</span>` : ''}
        </div>
      `).join('');

      return `
        <article class="skill-category-card">
          <div class="skill-category-header">
            <span class="skill-category-icon">${getIconSvg(iconName, { size: 18 })}</span>
            <h3 class="skill-category-title">${escapeHtml(category)}</h3>
            <span class="skill-category-count">${items.length.toString().padStart(2, '0')}</span>
          </div>
          <div class="skill-chips-list">${chipsHtml}</div>
        </article>
      `;
    }).join('');
  }

  /* ==========================================================================
     Featured Projects
     ========================================================================== */
  renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const allProjects = Array.isArray(this.projects) ? this.projects : [];
    const filtersContainer = document.getElementById('project-filters');
    const countEl = document.getElementById('project-count');
    const categories = [...new Set(allProjects.map((project) => project.category).filter(Boolean))];
    const filters = [{ label: 'All projects', value: 'All' }, ...categories.map((category) => ({ label: category, value: category }))];

    if (filtersContainer) {
      filtersContainer.innerHTML = filters.map((filter) => {
        const active = this.activeProjectFilter === filter.value;
        return `<button type="button" class="project-filter${active ? ' is-active' : ''}" data-project-filter="${escapeHtml(filter.value)}" aria-pressed="${active}">${escapeHtml(filter.label)}</button>`;
      }).join('');

      filtersContainer.querySelectorAll('[data-project-filter]').forEach((button) => {
        button.addEventListener('click', () => {
          this.activeProjectFilter = button.getAttribute('data-project-filter') || 'All';
          this.renderProjects();
        });
      });
    }

    const visibleProjects = this.activeProjectFilter === 'All'
      ? allProjects
      : allProjects.filter((project) => project.category === this.activeProjectFilter);

    if (countEl) {
      countEl.textContent = this.activeProjectFilter === 'All'
        ? `${visibleProjects.length} concept case studies`
        : `${visibleProjects.length} of ${allProjects.length} case studies`;
    }

    if (visibleProjects.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">${getIconSvg('folder', { size: 36 })}</div>
          <h3 class="empty-state-title">No Projects in This Category</h3>
          <p class="empty-state-text">Choose another category to explore more case studies.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = visibleProjects.map((proj, index) => {
      const coverUrl = sanitizeUrl(proj.cover_image_url || 'assets/images/project-academia.jpg', 'assets/images/project-academia.jpg');
      const tagsHtml = (proj.tags || []).map(tag => `<span class="project-tag">${escapeHtml(tag)}</span>`).join('');
      const stage = proj.stage_label || 'Case study';
      const category = proj.category || 'Project';

      return `
        <article class="project-card" data-slug="${escapeHtml(proj.slug)}">
          <div class="project-cover-container">
            <img src="${escapeHtml(coverUrl)}" alt="${escapeHtml(proj.title)} concept preview" class="project-cover-img" loading="lazy" decoding="async">
            ${proj.is_featured ? `<span class="badge badge-accent project-featured-badge">Featured</span>` : ''}
          </div>
          <div class="project-card-body">
            <div class="project-card-meta">
              <span class="project-card-category">${escapeHtml(category)}</span>
              <span class="project-card-stage">${escapeHtml(stage)}</span>
            </div>
            <h3 class="project-card-title">${escapeHtml(proj.title)}</h3>
            <p class="project-card-desc">${escapeHtml(proj.short_description)}</p>
            <div class="project-tags">${tagsHtml}</div>
            <div class="project-card-footer">
              <button type="button" class="btn btn-outline btn-sm view-project-btn" data-slug="${escapeHtml(proj.slug)}">
                View Case Study
              </button>
              <div class="project-actions">
                ${proj.demo_url ? `
                  <a href="${escapeHtml(sanitizeUrl(proj.demo_url))}" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-sm" title="Live Demo" aria-label="Live Demo for ${escapeHtml(proj.title)}">
                    ${getIconSvg('external-link', { size: 16 })}
                  </a>
                ` : ''}
                ${proj.repo_url ? `
                  <a href="${escapeHtml(sanitizeUrl(proj.repo_url))}" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-sm" title="Source Code" aria-label="Source Code for ${escapeHtml(proj.title)}">
                    ${getIconSvg('github', { size: 16 })}
                  </a>
                ` : ''}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('.view-project-btn').forEach(btn => {
      btn.addEventListener('click', () => this.openProjectDetails(btn.getAttribute('data-slug')));
    });

    // New cards created after filtering also receive scroll-reveal behavior.
    this.initScrollReveal();
  }

  initProjectModal() {
    const modalEl = document.getElementById('project-details-modal');
    if (modalEl) {
      this.projectModal = new Modal(modalEl, {
        onClose: () => {
          // Clean up URL query parameter when modal closes
          const url = new URL(window.location);
          if (url.searchParams.has('project')) {
            url.searchParams.delete('project');
            window.history.pushState({}, '', url);
          }
        }
      });
    }

    // Listen to browser forward/back buttons
    window.addEventListener('popstate', () => {
      const url = new URL(window.location);
      const slug = url.searchParams.get('project');
      if (slug) {
        this.openProjectDetails(slug, false);
      } else if (this.projectModal && this.projectModal.isOpen) {
        this.projectModal.close();
      }
    });
  }

  handleInitialRoute() {
    const url = new URL(window.location);
    const slug = url.searchParams.get('project');
    if (slug) {
      this.openProjectDetails(slug, false);
    }
  }

  openProjectDetails(slug, updateHistory = true) {
    const project = this.projects.find(p => p.slug === slug);
    if (!project || !this.projectModal) return;

    if (updateHistory) {
      const url = new URL(window.location);
      url.searchParams.set('project', slug);
      window.history.pushState({ project: slug }, '', url);
    }

    const modalTitle = document.getElementById('project-modal-title');
    const modalBody = document.getElementById('project-modal-body');
    const modalFooter = document.getElementById('project-modal-footer');

    if (modalTitle) modalTitle.textContent = project.title;

    if (modalBody) {
      const coverUrl = sanitizeUrl(project.cover_image_url || 'assets/images/project-academia.jpg', 'assets/images/project-academia.jpg');
      const tagsHtml = (project.tags || []).map(tag => `<span class="badge badge-neutral">${escapeHtml(tag)}</span>`).join(' ');

      const highlightsHtml = Array.isArray(project.highlights) && project.highlights.length
        ? `<ul class="case-study-highlights">${project.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
        : '';
      modalBody.innerHTML = `
        <img src="${escapeHtml(coverUrl)}" alt="${escapeHtml(project.title)} concept preview" class="modal-project-cover" loading="lazy" decoding="async">
        <div class="case-study-meta">
          <span class="project-card-category">${escapeHtml(project.category || 'Project')}</span>
          <span class="project-card-stage">${escapeHtml(project.stage_label || 'Case study')}</span>
        </div>
        <div class="case-study-tags">${tagsHtml}</div>
        <div class="modal-project-section">
          <h4>Overview</h4>
          <p>${escapeHtml(project.full_description || project.short_description)}</p>
        </div>
        ${project.role ? `
          <div class="modal-project-section">
            <h4>My Focus</h4>
            <p>${escapeHtml(project.role)}</p>
          </div>
        ` : ''}
        ${project.problem ? `
          <div class="modal-project-section">
            <h4>Problem & Challenge</h4>
            <p>${escapeHtml(project.problem)}</p>
          </div>
        ` : ''}
        ${project.solution ? `
          <div class="modal-project-section">
            <h4>Approach & Solution</h4>
            <p>${escapeHtml(project.solution)}</p>
          </div>
        ` : ''}
        ${highlightsHtml ? `
          <div class="modal-project-section">
            <h4>Key Sections</h4>
            ${highlightsHtml}
          </div>
        ` : ''}
        ${project.learning_outcome ? `
          <div class="modal-project-section">
            <h4>What I Explored</h4>
            <p>${escapeHtml(project.learning_outcome)}</p>
          </div>
        ` : ''}
        ${project.scope_note ? `
          <aside class="project-scope-note" aria-label="Project scope note">
            <strong>Scope note</strong>
            <p>${escapeHtml(project.scope_note)}</p>
          </aside>
        ` : ''}
      `;
    }

    if (modalFooter) {
      modalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary btn-sm" data-modal-close>Close</button>
        ${project.demo_url ? `
          <a href="${escapeHtml(sanitizeUrl(project.demo_url))}" target="_blank" rel="noopener noreferrer" class="btn btn-accent btn-sm">
            ${getIconSvg('external-link', { size: 14 })} Live Demo
          </a>
        ` : ''}
        ${project.repo_url ? `
          <a href="${escapeHtml(sanitizeUrl(project.repo_url))}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            ${getIconSvg('github', { size: 14 })} View Code
          </a>
        ` : ''}
      `;

      modalFooter.querySelector('[data-modal-close]')?.addEventListener('click', () => {
        this.projectModal.close();
      });
    }

    this.projectModal.open();
  }

  /* ==========================================================================
     Contact Section & Form Submission
     ========================================================================== */
  renderContact() {
    if (!this.settings) return;

    const emailEl = document.getElementById('contact-email-link');
    if (emailEl && isValidEmail(this.settings.contact_email || '')) {
      emailEl.href = `mailto:${this.settings.contact_email.trim()}`;
      emailEl.textContent = this.settings.contact_email.trim();
      emailEl.hidden = false;
    } else if (emailEl) {
      emailEl.removeAttribute('href');
      emailEl.textContent = 'Email available on request';
      emailEl.hidden = false;
    }

    this.renderSocialLinks('contact-socials');
  }


  initScrollReveal() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) return;

    const selectors = [
      '.hero-content',
      '.hero-media-wrapper',
      '.section-header',
      '.about-bio',
      '.about-education',
      '.skill-category-card',
      '.project-card',
      '.contact-info-card',
      '.contact-form-card'
    ];

    document.documentElement.classList.add('motion-ready');
    const targets = document.querySelectorAll(selectors.join(','));
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    targets.forEach((target, index) => {
      if (target.dataset.revealInitialized === 'true') return;
      target.dataset.revealInitialized = 'true';
      target.classList.add('reveal-on-scroll');
      if (target.matches('.skill-category-card, .project-card')) {
        target.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
      }
      observer.observe(target);
    });
  }

  initContactForm() {
    const form = document.getElementById('contact-form');
    const alertBox = document.getElementById('contact-status-alert');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner"></span> Sending...`;
      }
      if (alertBox) {
        alertBox.className = 'contact-status-alert';
        alertBox.style.display = 'none';
      }

      try {
        const result = await publicContent.submitContactMessage(formData);

        if (result?.demo) {
          const message = result.message || 'This is a frontend-only demo. No message was sent or stored.';
          if (alertBox) {
            alertBox.className = 'contact-status-alert is-info';
            alertBox.textContent = message;
            alertBox.style.display = 'block';
          }
          toast.info('Demo only — message not sent or stored.');
          return;
        }

        if (alertBox) {
          alertBox.className = 'contact-status-alert is-success';
          alertBox.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
          alertBox.style.display = 'block';
        }
        toast.success('Message sent successfully!');
        form.reset();
      } catch (err) {
        if (alertBox) {
          alertBox.className = 'contact-status-alert is-error';
          alertBox.textContent = err.message || 'Failed to send message. Please try again later.';
          alertBox.style.display = 'block';
        }
        toast.error(err.message || 'Failed to send message.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Send Message ${getIconSvg('mail', { size: 16 })}`;
        }
      }
    });
  }

  /* ==========================================================================
     Footer
     ========================================================================== */
  renderFooter() {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    const brandEl = document.getElementById('footer-brand-name');
    if (brandEl && this.settings) {
      brandEl.textContent = this.settings.brand_name || 'Rawan';
    }

    const footerTextEl = document.getElementById('footer-text');
    if (footerTextEl && this.settings && this.settings.footer_text) {
      footerTextEl.textContent = this.settings.footer_text;
    }
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.init();
});
