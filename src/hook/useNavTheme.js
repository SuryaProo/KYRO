// src/hook/useNavTheme.js
import { useEffect, useState } from 'react';

export function useNavTheme(defaultTheme = 'light') {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    let rafId;

    const detect = () => {
      // Find navbar height
      const header = document.querySelector('header[data-nav-header]');
      const headerHeight = header?.getBoundingClientRect().height ?? 64;

      // Sample the point just BELOW the navbar
      const x = Math.floor(window.innerWidth / 2);
      const y = Math.min(window.innerHeight - 1, Math.floor(headerHeight + 1));
      const el = document.elementFromPoint(x, y);

      // Find closest element tagged with data-nav-theme
      const themed = el?.closest?.('[data-nav-theme]');
      const t = themed?.getAttribute('data-nav-theme') || defaultTheme;

      setTheme(t);
    };

    const onScrollOrResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(detect);
    };

    // Initial run and listeners
    detect();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('load', onScrollOrResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('load', onScrollOrResize);
    };
  }, [defaultTheme]);

  return theme; // 'light' | 'dark'
}