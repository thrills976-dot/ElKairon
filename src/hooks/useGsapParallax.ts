import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for setting up GSAP ScrollTrigger parallax and cinematic reveal effects
 */
export function useGsapParallax() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Vertical Parallax Elements (e.g. background shapes, floating badges)
      const parallaxItems = rootRef.current?.querySelectorAll<HTMLElement>('[data-parallax-speed]');
      parallaxItems?.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.2');
        const direction = el.getAttribute('data-parallax-direction') === 'down' ? 1 : -1;

        gsap.to(el, {
          y: () => direction * 100 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });

      // 2. Horizontal Scrolling Big Typography Watermarks
      const textTickerLeft = rootRef.current?.querySelectorAll<HTMLElement>('[data-parallax-scroll-left]');
      textTickerLeft?.forEach((el) => {
        gsap.to(el, {
          x: -180,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      const textTickerRight = rootRef.current?.querySelectorAll<HTMLElement>('[data-parallax-scroll-right]');
      textTickerRight?.forEach((el) => {
        gsap.to(el, {
          x: 180,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      // 3. Cinematic Scale & Parallax for Images and Media Cards
      const parallaxImages = rootRef.current?.querySelectorAll<HTMLElement>('[data-parallax-image]');
      parallaxImages?.forEach((img) => {
        gsap.fromTo(
          img,
          { y: -30, scale: 1.08 },
          {
            y: 30,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });

      // 4. Glow Orb Pulsing Parallax
      const glowOrbs = rootRef.current?.querySelectorAll<HTMLElement>('[data-parallax-glow]');
      glowOrbs?.forEach((orb) => {
        gsap.to(orb, {
          y: -120,
          scale: 1.25,
          opacity: 0.8,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: orb,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      });
    }, rootRef);

    // Refresh ScrollTrigger calculations after initial render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return rootRef;
}
