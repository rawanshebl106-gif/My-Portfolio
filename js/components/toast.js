/**
 * Accessible Toast Notification System
 * Supports success, error, warning, and info messages.
 */

import { getIconSvg } from '../core/icons.js';
import { escapeHtml } from '../core/sanitize.js';

class ToastManager {
  constructor() {
    this.container = null;
    this.ensureContainer();
  }

  ensureContainer() {
    if (typeof document === 'undefined') return;
    this.container = document.querySelector('.toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      this.container.setAttribute('aria-live', 'polite');
      this.container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(this.container);
    }
  }

  /**
   * Shows a toast message
   * @param {string} message
   * @param {'success'|'error'|'warning'|'info'} [type='info']
   * @param {number} [duration=4000]
   */
  show(message, type = 'info', duration = 4000) {
    this.ensureContainer();
    if (!this.container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

    let iconName = 'alert-circle';
    if (type === 'success') iconName = 'check';
    else if (type === 'error') iconName = 'alert-circle';
    else if (type === 'warning') iconName = 'alert-circle';

    toast.innerHTML = `
      <div class="toast-icon">${getIconSvg(iconName, { size: 18 })}</div>
      <div class="toast-message">${escapeHtml(message)}</div>
      <button type="button" class="toast-close" aria-label="Close notification">
        ${getIconSvg('x', { size: 14 })}
      </button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    let timer = null;

    const removeToast = () => {
      if (timer) clearTimeout(timer);
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 200);
    };

    closeBtn.addEventListener('click', removeToast);

    if (duration > 0) {
      timer = setTimeout(removeToast, duration);
    }

    this.container.appendChild(toast);
  }

  success(msg, duration) { this.show(msg, 'success', duration); }
  error(msg, duration) { this.show(msg, 'error', duration); }
  warning(msg, duration) { this.show(msg, 'warning', duration); }
  info(msg, duration) { this.show(msg, 'info', duration); }
}

export const toast = new ToastManager();
