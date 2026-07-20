import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * useGSAP — thin wrapper for GSAP animations in React components.
 *
 * Creates a GSAP context scoped to a container ref for proper cleanup.
 * The callback receives a { gsap, context } object matching @gsap/react's API.
 *
 * @param {Function} callback   — (ctx) => { ... return () => cleanup() }
 * @param {Array}    deps       — dependency array (default: runs once on mount)
 * @param {React.RefObject} scopeRef — optional container ref for selector scoping
 */
export function useGSAP(callback, deps = [], scopeRef = null) {
  const contextRef = useRef(null);

  useEffect(() => {
    const scope = scopeRef?.current ?? document.documentElement;
    const ctx = gsap.context(() => {
      callback({ gsap, context: ctx });
    }, scope);

    contextRef.current = ctx;

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return contextRef;
}

export default useGSAP;
