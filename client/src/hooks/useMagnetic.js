import { useEffect, useRef } from 'react';
import { applyMagnetic } from '../animations/cursor/magnetic';

/**
 * useMagnetic — attaches magnetic hover effect to a ref element.
 *
 * @param {number} strength  — pull strength (0.2 = subtle, 0.5 = strong)
 * @returns {React.RefObject}
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cleanup = applyMagnetic(el, strength);
    return cleanup;
  }, [strength]);

  return ref;
}

export default useMagnetic;
