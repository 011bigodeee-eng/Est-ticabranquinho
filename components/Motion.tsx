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
          const direction = element.dataset.image;
          const mask = direction === 'left' ? 'inset(0 16% 0 0)'
            : direction === 'right' ? 'inset(0 0 0 16%)' : 'inset(8% 0)';
          gsap.from(element, {
            opacity: 0, y: image ? 12 : 24,
            clipPath: image ? mask : 'inset(0 0 12% 0)',
            duration: image ? 0.76 : 0.56, ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 92%', once: true },
          });
        });
      });
      media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const heroScroll = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
        gsap.to('.hero-photo img', { yPercent: 9, ease: 'none', scrollTrigger: heroScroll });
        gsap.to('.hero-copy', { yPercent: 24, ease: 'none', scrollTrigger: heroScroll });
        gsap.to('.hero-photo', { opacity: 0.67, ease: 'none', scrollTrigger: heroScroll });
        gsap.utils.toArray<HTMLElement>('.service-photo').forEach((frame) => {
          const image = frame.querySelector('img');
          gsap.fromTo(image, { yPercent: -2 }, {
            yPercent: 2, ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });
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
          const x = gsap.quickTo(button, 'x', { duration: 0.28 });
          const y = gsap.quickTo(button, 'y', { duration: 0.28 });
          const move = (event: PointerEvent) => {
            const rect = button.getBoundingClientRect();
            const left = event.clientX - rect.left;
            const top = event.clientY - rect.top;
            x((left - rect.width / 2) * 0.08);
            y((top - rect.height / 2) * 0.15);
            button.style.setProperty('--light-x', `${left}px`);
            button.style.setProperty('--light-y', `${top}px`);
          };
          const reset = () => { x(0); y(0); };
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

    void setup().catch(() => { cleanup?.(); });
    return () => { disposed = true; cleanup?.(); };
  }, []);

  return null;
}
