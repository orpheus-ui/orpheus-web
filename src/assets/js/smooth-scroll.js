import { gsap } from "./gsap-config";

export const initSmoothScroll = () => {
  let currentScroll = window.pageYOffset;
  let targetScroll = currentScroll;
  let scrollAnimation;

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      // Cancel any ongoing animation
      if (scrollAnimation) {
        scrollAnimation.kill();
      }

      // Update target scroll position
      targetScroll = Math.max(
        0,
        Math.min(
          targetScroll + e.deltaY * 1.5, // Adjust multiplier for scroll speed
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );

      // Create new scroll animation
      scrollAnimation = gsap.to(window, {
        duration: 0.8, // Adjust duration for smoothness
        scrollTo: {
          y: targetScroll,
          autoKill: true,
        },
        ease: "power2.out", // Try different easing functions
      });
    },
    { passive: false },
  );
};
