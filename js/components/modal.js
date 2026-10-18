/**
 * Accessible Modal Dialog Component
 * Implements WAI-ARIA Dialog (Modal) Pattern:
 * - Focus trapping
 * - Escape key dismissal
 * - Focus restoration to triggering element
 * - Scroll-lock on document body
 */

export class Modal {
  /**
   * @param {string|HTMLElement} element
   * @param {object} [options]
   * @param {boolean} [options.closeOnBackdrop=true]
   * @param {Function} [options.onOpen]
   * @param {Function} [options.onClose]
   */
  constructor(element, options = {}) {
    this.modalEl = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.modalEl) {
      throw new Error(`Modal element not found: ${element}`);
    }

    this.options = {
      closeOnBackdrop: true,
      ...options
    };

    this.dialogEl = this.modalEl.querySelector('.modal-dialog') || this.modalEl;
    this.closeButtons = this.modalEl.querySelectorAll('[data-modal-close]');
    this.previouslyFocusedEl = null;
    this.isOpen = false;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);

    this.init();
  }

  init() {
    this.modalEl.setAttribute('role', 'dialog');
    this.modalEl.setAttribute('aria-modal', 'true');

    this.closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    if (this.options.closeOnBackdrop) {
      this.modalEl.addEventListener('click', this.handleBackdropClick);
    }
  }

  handleBackdropClick(e) {
    if (e.target === this.modalEl) {
      this.close();
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      this.close();
      return;
    }

    if (e.key === 'Tab') {
      this.trapFocus(e);
    }
  }

  trapFocus(e) {
    const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    const focusables = Array.from(this.modalEl.querySelectorAll(focusableSelectors))
      .filter(el => el.offsetWidth > 0 || el.offsetHeight > 0);

    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    const firstEl = focusables[0];
    const lastEl = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        lastEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastEl) {
        firstEl.focus();
        e.preventDefault();
      }
    }
  }

  open() {
    if (this.isOpen) return;

    this.previouslyFocusedEl = document.activeElement;
    this.isOpen = true;
    this.modalEl.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', this.handleKeyDown);

    // Focus first interactive element or dialog
    setTimeout(() => {
      const focusable = this.modalEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) {
        focusable.focus();
      } else {
        this.dialogEl.focus();
      }
    }, 50);

    if (typeof this.options.onOpen === 'function') {
      this.options.onOpen();
    }
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.modalEl.classList.remove('is-active');
    document.body.style.overflow = '';

    document.removeEventListener('keydown', this.handleKeyDown);

    if (this.previouslyFocusedEl && typeof this.previouslyFocusedEl.focus === 'function') {
      this.previouslyFocusedEl.focus();
    }

    if (typeof this.options.onClose === 'function') {
      this.options.onClose();
    }
  }
}
