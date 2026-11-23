'use client';

import { useEffect, useRef } from 'react';

import { sessionKey } from '../app/cinematic';

export function CinematicIntro() {
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const stage = overlay.current;
    if (!stage || root.dataset.cinematic !== 'pending') return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let ended = false;
    let revert: (() => void) | undefined;

    function close(returnFocus = false) {
      if (ended) return;
      ended = true;
      try { sessionStorage.setItem(sessionKey, '1'); } catch {}
      delete root.dataset.cinematic;
      revert?.();
      unsubscribe();
      if (returnFocus) {
        document.getElementById('hero-title')?.focus({ preventScroll: true });
      }
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true);
    };
    const onScroll = () => { if (window.scrollY > 4) close(); };
    const onFocus = () => close();
    const onPreference = () => { if (preference.matches) close(); };
    function unsubscribe() {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onEscape);
      document.removeEventListener('focusin', onFocus);
      preference.removeEventListener('change', onPreference);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onEscape);
    document.addEventListener('focusin', onFocus);
    preference.addEventListener('change', onPreference);

    async function play() {
      if (preference.matches || window.scrollY > 4) {
        close();
        return;
      }
      try {
        const { gsap } = await import('gsap');
        if (ended) return;
        if (root.dataset.cinematic !== 'pending') {
          close();
          return;
        }
        const veil = stage!.querySelector('.cinematic-veil');
        const light = stage!.querySelector('.cinematic-light');
        const headlights = stage!.querySelector('.cinematic-headlights');
        const headline = '.hero-wordmark';
        const studio = '.hero-studio';
        const tagline = '.hero-tagline';
        const chrome = ['.header', '.hero-mobile-actions', '.floating-wa'];
        const mobile = matchMedia('(max-width: 800px)').matches;
        const context = gsap.context(() => {});
        revert = () => context.revert();
        context.add(() => {
          gsap.set(veil, { opacity: 1 });
          gsap.set([light, headlights, studio, tagline, ...chrome], { opacity: 0 });
          gsap.set(headline, { clipPath: 'inset(0 100% 0 0)' });
          root.dataset.cinematic = 'playing';

          const timeline = gsap.timeline({ onComplete: () => close() });
          timeline
            .to(light, { opacity: 0.65, duration: 0.35, ease: 'sine.out' }, 0.15)
            .to(veil, { opacity: 0.87, duration: 0.7, ease: 'sine.inOut' }, 0.5)
            .fromTo(light, { xPercent: -12 }, { xPercent: mobile ? 2 : 15, opacity: 0.18, duration: 1.45, ease: 'sine.inOut' }, 0.48)
            .to(veil, { opacity: 0.48, duration: 0.65, ease: 'sine.inOut' }, 1.2)
            .to(headlights, { opacity: 0.45, duration: 0.42, ease: 'sine.out' }, 1.2)
            .to(headlights, { opacity: 0, duration: 0.65, ease: 'sine.out' }, 1.62)
            .to(headline, { clipPath: 'inset(0 0% 0 0)', duration: 0.65, ease: 'power2.inOut' }, 1.8)
            .to(studio, { opacity: 1, duration: 0.5, ease: 'sine.out' }, 2.18)
            .to(veil, { opacity: 0, duration: 0.72, ease: 'sine.inOut' }, 2.58)
            .to(light, { opacity: 0, duration: 0.7, ease: 'sine.out' }, 2.58)
            .fromTo(tagline, { y: 6 }, { y: 0, opacity: 1, duration: 0.48, ease: 'power2.out' }, 3.28)
            .to(chrome, { opacity: 1, duration: 0.57, ease: 'sine.out' }, 3.43);
          if (mobile) timeline.timeScale(1.43);
        });
      } catch {
        close();
      }
    }

    void play();
    return () => {
      ended = true;
      delete root.dataset.cinematic;
      revert?.();
      unsubscribe();
    };
  }, []);

  return (
    <div className="cinematic-intro" ref={overlay}>
      <div className="cinematic-veil" aria-hidden="true" />
      <div className="cinematic-light" aria-hidden="true" />
      <div className="cinematic-headlights" aria-hidden="true" />
    </div>
  );
}
