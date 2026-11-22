'use client';

import { useEffect } from 'react';

export function Motion() {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          if (element.getBoundingClientRect().top < innerHeight) return;
          const image = element.hasAttribute('data-image');
          gsap.from(element, {
            opacity: 0, y: image ? 12 : 24, clipPath: image ? 'inset(8% 0 8% 0)' : 'inset(0%)',
            duration: 0.65, ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 92%', once: true },
          });
        });
      });
      media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.experience-frame', { scale: 0.9 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: '.experience', start: 'top bottom', end: 'center center', scrub: true },
        });
        gsap.to('.experience-image', {
          yPercent: 5, ease: 'none',
          scrollTrigger: { trigger: '.experience', start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
      media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const buttons = gsap.utils.toArray<HTMLElement>('[data-magnetic]');
        const dispose = buttons.map((button) => {
          const move = (event: PointerEvent) => {
            const rect = button.getBoundingClientRect();
            gsap.to(button, { x: (event.clientX - rect.left - rect.width / 2) * 0.07, y: (event.clientY - rect.top - rect.height / 2) * 0.14, duration: 0.25 });
          };
          const reset = () => gsap.to(button, { x: 0, y: 0, duration: 0.3 });
          button.addEventListener('pointermove', move);
          button.addEventListener('pointerleave', reset);
          return () => {
            button.removeEventListener('pointermove', move);
            button.removeEventListener('pointerleave', reset);
            gsap.killTweensOf(button);
            gsap.set(button, { clearProps: 'transform' });
          };
        });
        return () => dispose.forEach((fn) => fn());
      });
      cleanup = () => media.revert();
    }

    void setup();
    return () => { disposed = true; cleanup?.(); };
  }, []);

  return null;
}
