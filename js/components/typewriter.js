/**
 * Accessible, resilient Vanilla JS Typewriter component.
 * Features:
 * - Smooth typing and deleting phases
 * - Proper timer cleanup to prevent memory leaks and orphaned intervals
 * - Empty/missing phrase handling
 * - Respects prefers-reduced-motion: falls back immediately to static or simple cycle without rapid flashing
 */

export class Typewriter {
  /**
   * @param {HTMLElement} element Target text element
   * @param {string[]} phrases Array of phrases to rotate
   * @param {object} [options]
   * @param {number} [options.typeSpeed=70] Milliseconds per typed character
   * @param {number} [options.deleteSpeed=40] Milliseconds per deleted character
   * @param {number} [options.pauseEnd=2000] Milliseconds to pause after typing
   * @param {number} [options.pauseStart=500] Milliseconds to pause before typing next
   */
  constructor(element, phrases = [], options = {}) {
    this.element = element;
    this.phrases = Array.isArray(phrases) && phrases.length > 0 
      ? phrases.filter(p => typeof p === 'string' && p.trim().length > 0)
      : ['Web Developer'];

    this.typeSpeed = options.typeSpeed || 70;
    this.deleteSpeed = options.deleteSpeed || 40;
    this.pauseEnd = options.pauseEnd || 2000;
    this.pauseStart = options.pauseStart || 500;

    this.currentIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.timeoutId = null;
    this.isRunning = false;

    // Check prefers-reduced-motion
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    if (this.prefersReducedMotion) {
      // Just display the first phrase statically for accessibility
      this.element.textContent = this.phrases[0] || '';
      return;
    }

    this.tick();
  }

  stop() {
    this.isRunning = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  updatePhrases(newPhrases) {
    this.stop();
    this.phrases = Array.isArray(newPhrases) && newPhrases.length > 0
      ? newPhrases.filter(p => typeof p === 'string' && p.trim().length > 0)
      : ['Web Developer'];
    this.currentIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.start();
  }

  tick() {
    if (!this.isRunning) return;

    const currentPhrase = this.phrases[this.currentIndex] || '';
    
    if (this.isDeleting) {
      this.currentCharIndex--;
      this.element.textContent = currentPhrase.substring(0, this.currentCharIndex);
    } else {
      this.currentCharIndex++;
      this.element.textContent = currentPhrase.substring(0, this.currentCharIndex);
    }

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.currentCharIndex === currentPhrase.length) {
      // Finished typing full word
      delay = this.pauseEnd;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      // Finished deleting word
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
      delay = this.pauseStart;
    }

    this.timeoutId = setTimeout(() => this.tick(), delay);
  }
}
