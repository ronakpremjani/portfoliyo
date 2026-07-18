import gsap from 'gsap';

/**
 * Manual line-split text animation (no Club GSAP required).
 *
 * Splits text content into lines by wrapping each in a <span>,
 * then animates each line with a stagger. Cleans up wrapper spans
 * after animation completes (optional, for DOM hygiene).
 *
 * @param {Element} element     — the text element to animate
 * @param {Object}  options
 * @param {number}  options.delay       — delay before first line
 * @param {number}  options.stagger     — time between lines
 * @param {number}  options.duration    — per-line animation duration
 * @param {boolean} options.restore     — remove wrapper spans after done
 * @returns {gsap.core.Timeline | null}
 */
export function animateLines(element, options = {}) {
  if (!element) return null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    gsap.set(element, { opacity: 1 });
    return null;
  }

  const {
    delay = 0,
    stagger = 0.1,
    duration = 0.85,
    restore = false,
  } = options;

  const lines = splitIntoLines(element);
  if (!lines.length) return null;

  // Hide lines initially
  gsap.set(lines, { opacity: 0, y: 20, overflow: 'hidden' });

  const tl = gsap.timeline({ delay });

  tl.to(lines, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease: 'power3.out',
    onComplete: restore
      ? () => restoreElement(element)
      : undefined,
  });

  return tl;
}

/**
 * Splits an element's text into line spans using the browser's
 * layout engine. Works by temporarily measuring word positions.
 */
function splitIntoLines(element) {
  const originalText = element.innerText;
  const words = originalText.split(' ').filter(Boolean);

  // Replace content with span-wrapped words for measurement
  element.innerHTML = words
    .map((w) => `<span class="__split-word" style="display:inline-block">${w}&nbsp;</span>`)
    .join('');

  const wordEls = Array.from(element.querySelectorAll('.__split-word'));
  const lines = [];
  let currentLine = [];
  let currentTop = null;

  for (const word of wordEls) {
    const rect = word.getBoundingClientRect();
    const top = Math.round(rect.top);

    if (currentTop === null) {
      currentTop = top;
    }

    if (top !== currentTop) {
      // New line detected
      lines.push(currentLine);
      currentLine = [word];
      currentTop = top;
    } else {
      currentLine.push(word);
    }
  }
  if (currentLine.length) lines.push(currentLine);

  // Wrap each line in a container span
  element.innerHTML = '';
  const lineSpans = lines.map((lineWords) => {
    const lineEl = document.createElement('span');
    lineEl.style.cssText = 'display:block; overflow:hidden; padding-bottom:0.05em';
    lineWords.forEach((w) => {
      w.className = '';
      lineEl.appendChild(w);
    });
    element.appendChild(lineEl);
    return lineEl;
  });

  return lineSpans;
}

function restoreElement(element) {
  const text = element.innerText;
  element.innerHTML = text;
}
