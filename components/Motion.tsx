'use client';

import { useEffect } from 'react';

const movement = '(prefers-reduced-motion: no-preference)';
const desktop = `(min-width: 900px) and ${movement}`;
const precisionPointer = `(hover: hover) and (pointer: fine) and ${desktop}`;

export function Motion() {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      cleanup = () => media.revert();

      media.add(movement, () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          if (element.getBoundingClientRect().top < innerHeight * 0.92) return;
          const picture = element.hasAttribute('data-image');
          const heading = element.querySelector('h2, h3');
          const direction = element.dataset.image;
          const mask = direction === 'left' ? 'inset(0 18% 0 0)'
            : direction === 'right' ? 'inset(0 0 0 18%)' : 'inset(9% 0)';
          const timeline = gsap.timeline({
            delay: Number(element.dataset.stagger ?? 0) * 0.065,
            scrollTrigger: { trigger: element, start: 'top 93%', once: true },
          });

          if (picture) {
            timeline.from(element, { opacity: 0.12, y: 15, clipPath: mask, duration: 0.74, ease: 'power2.out' });
          } else {
            timeline.from(element, { opacity: 0, y: 15, duration: 0.55, ease: 'power2.out' });
            if (heading) timeline.from(heading, { y: 18, clipPath: 'inset(100% 0 0)', duration: 0.68, ease: 'power3.out' }, 0);
          }
        });

        gsap.fromTo('.liquid-sweep', { xPercent: -150 }, {
          xPercent: 155, duration: 1.45, ease: 'sine.inOut',
          scrollTrigger: { trigger: '.liquid-photo', start: 'top 85%', once: true },
        });
      });

      media.add(desktop, () => {
        const heroScroll = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
        gsap.to('.hero-photo img', { yPercent: 6, ease: 'none', scrollTrigger: heroScroll });
        gsap.to('.hero-photo', { opacity: 0.64, ease: 'none', scrollTrigger: heroScroll });

        gsap.utils.toArray<HTMLElement>('.service-photo').forEach((frame) => {
          gsap.fromTo(frame.querySelector('.service-image'), { yPercent: -2 }, {
            yPercent: 2, ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });

        const galleryScroll = { trigger: '.gallery', start: 'top bottom', end: 'bottom top', scrub: true };
        gsap.fromTo('[data-gallery-column="0"]', { x: -8, y: 20 }, {
          x: 8, y: -20, ease: 'none', scrollTrigger: galleryScroll,
        });
        gsap.fromTo('[data-gallery-column="1"]', { x: 8, y: -20 }, {
          x: -8, y: 20, ease: 'none', scrollTrigger: galleryScroll,
        });

        gsap.fromTo('.experience-frame', { clipPath: 'inset(0 9% round 22px)' }, {
          clipPath: 'inset(0 0% round 0px)', ease: 'none',
          scrollTrigger: { trigger: '.experience', start: 'top 95%', end: 'center 53%', scrub: true },
        });
        gsap.to('.experience-image', {
          yPercent: 4, ease: 'none',
          scrollTrigger: { trigger: '.experience', start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      media.add(precisionPointer, () => {
        function track(element: HTMLElement, move: (x: number, y: number) => void, reset: () => void) {
          function onMove(event: PointerEvent) {
            if (event.pointerType === 'touch') return;
            const rect = element.getBoundingClientRect();
            move((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
          }

          element.addEventListener('pointermove', onMove, { passive: true });
          element.addEventListener('pointerleave', reset);
          return () => {
            element.removeEventListener('pointermove', onMove);
            element.removeEventListener('pointerleave', reset);
          };
        }

        const hero = document.querySelector<HTMLElement>('.hero')!;
        const layers = [
          [hero.querySelector('.hero-glow-far'), -22, -12],
          [hero.querySelector('.hero-glow-near'), 28, 16],
          [hero.querySelector('.hero-depth'), 10, 6],
        ] as const;
        const axes = layers.map(([layer, depthX, depthY]) => ({
          layer, depthX, depthY,
          x: gsap.quickTo(layer, 'x', { duration: 0.55, ease: 'power3.out' }),
          y: gsap.quickTo(layer, 'y', { duration: 0.55, ease: 'power3.out' }),
        }));
        const moveHero = (x: number, y: number) => {
          axes.forEach((axis) => {
            axis.x((x * 2 - 1) * axis.depthX);
            axis.y((y * 2 - 1) * axis.depthY);
          });
        };

        const stopHero = track(hero, moveHero, () => moveHero(0.5, 0.5));
        const zones = gsap.utils.toArray<HTMLElement>('[data-pointer]').map((element) => {
          const stop = track(element, (x, y) => {
            element.style.setProperty('--pointer-x', `${x * 100}%`);
            element.style.setProperty('--pointer-y', `${y * 100}%`);
            element.dataset.hovering = '';
            element.dataset.pointerReady = '';
          }, () => { delete element.dataset.hovering; });
          return () => {
            stop();
            delete element.dataset.hovering;
            delete element.dataset.pointerReady;
            element.style.removeProperty('--pointer-x');
            element.style.removeProperty('--pointer-y');
          };
        });

        const buttons = gsap.utils.toArray<HTMLElement>('[data-magnetic]').map((button) => {
          const x = gsap.quickTo(button, 'x', { duration: 0.28 });
          const y = gsap.quickTo(button, 'y', { duration: 0.28 });
          const stop = track(button, (left, top) => {
            x((left - 0.5) * 14);
            y((top - 0.5) * 8);
            button.style.setProperty('--light-x', `${left * 100}%`);
            button.style.setProperty('--light-y', `${top * 100}%`);
          }, () => { x(0); y(0); });
          return () => {
            stop();
            gsap.killTweensOf(button);
            button.style.removeProperty('transform');
            button.style.removeProperty('--light-x');
            button.style.removeProperty('--light-y');
          };
        });

        return () => {
          stopHero();
          axes.forEach(({ layer }) => {
            gsap.killTweensOf(layer);
            (layer as HTMLElement).style.removeProperty('transform');
          });
          zones.forEach((stop) => stop());
          buttons.forEach((stop) => stop());
        };
      });
    }

    void setup().catch(() => cleanup?.());
    return () => { disposed = true; cleanup?.(); };
  }, []);

  return null;
}
