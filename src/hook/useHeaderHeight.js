// src/hook/useHeaderHeight.js
import { useEffect } from 'react';

export function useHeaderHeight() {
  useEffect(() => {
    const setVar = () => {
      const header = document.querySelector('header[data-nav-header]');
      const h = header?.getBoundingClientRect().height || 64;
      document.documentElement.style.setProperty('--nav-h', `${Math.round(h)}px`);
    };
    setVar();
    window.addEventListener('resize', setVar);
    window.addEventListener('load', setVar);
    return () => {
      window.removeEventListener('resize', setVar);
      window.removeEventListener('load', setVar);
    };
  }, []);
}