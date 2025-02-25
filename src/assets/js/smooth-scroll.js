import { gsap } from "./gsap-config";

export const initSmoothScroll = () => {
  // Disable smooth scroll on mobile
  if (window.innerWidth < 768) return;

  let currentScroll = window.pageYOffset;
  let targetScroll = currentScroll;
  let scrollAnimation;

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      if (scrollAnimation) {
        scrollAnimation.kill();
      }

      targetScroll = Math.max(
        0,
        Math.min(
          targetScroll + e.deltaY * 1.5,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );

      scrollAnimation = gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: targetScroll, autoKill: true },
        ease: "power2.out",
      });
    },
    { passive: false },
  );
};
