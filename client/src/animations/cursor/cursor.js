/**
 * Custom cursor core — state machine + RAF-based position tracking.
 *
 * Exports a class-based controller so there's exactly one instance.
 * Position is interpolated via lerp for buttery smooth tracking.
 * Never causes React re-renders for position updates.
 */

const LERP_FACTOR = 0.12; // lower = smoother but laggier, higher = snappier

export class CursorController {
  constructor() {
    this.mouse = { x: 0, y: 0 };
    this.pos = { x: 0, y: 0 };      // interpolated position
    this.dotEl = null;
    this.ringEl = null;
    this.rafId = null;
    this.state = 'default'; // 'default' | 'hover' | 'text' | 'image' | 'link' | 'magnetic'
    this._boundMove = this._onMouseMove.bind(this);
    this._isVisible = false;
  }

  /** Mount: attach elements and start RAF loop */
  mount(dotEl, ringEl) {
    this.dotEl = dotEl;
    this.ringEl = ringEl;

    // Hide initially until first mouse move
    this._setVisibility(false);

    window.addEventListener('mousemove', this._boundMove, { passive: true });
    this._tick();
  }

  /** Unmount: remove listeners and cancel RAF */
  destroy() {
    window.removeEventListener('mousemove', this._boundMove);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  /** External: set cursor state from hover listeners */
  setState(state) {
    if (this.state === state) return;
    this.state = state;
    this._applyState();
  }

  // ─── Private ──────────────────────────────────────────────────────

  _onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    if (!this._isVisible) {
      // Snap on first move to avoid "flying in from 0,0"
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
      this._setVisibility(true);
    }
  }

  _tick() {
    this.rafId = requestAnimationFrame(() => this._tick());

    // Lerp position
    this.pos.x += (this.mouse.x - this.pos.x) * LERP_FACTOR;
    this.pos.y += (this.mouse.y - this.pos.y) * LERP_FACTOR;

    if (!this.dotEl || !this.ringEl) return;

    const tx = this.pos.x;
    const ty = this.pos.y;

    this.dotEl.style.transform  = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
    this.ringEl.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
  }

  _setVisibility(visible) {
    this._isVisible = visible;
    const opacity = visible ? '1' : '0';
    if (this.dotEl)  this.dotEl.style.opacity  = opacity;
    if (this.ringEl) this.ringEl.style.opacity = opacity;
  }

  _applyState() {
    if (!this.dotEl || !this.ringEl) return;

    // Reset first
    this.dotEl.removeAttribute('data-cursor');
    this.ringEl.removeAttribute('data-cursor');

    this.dotEl.setAttribute('data-cursor',  this.state);
    this.ringEl.setAttribute('data-cursor', this.state);
  }
}

// Singleton
export const cursorController = new CursorController();
