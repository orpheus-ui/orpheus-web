import { gsap } from "./gsap-config";

export const initSmoothScroll = () => {
  // Disable custom smooth scroll on mobile devices
  if (window.innerWidth < 768) return;

  // Use window.scrollY for the current vertical scroll position
  let targetScroll = window.scrollY;
  let scrollAnimation;

  window.addEventListener(
    "wheel",
    (e) => {
      // Prevent the default scroll behavior so our animation takes control
      e.preventDefault();

      // Kill any existing scroll animation for immediate responsiveness
      if (scrollAnimation) {
        scrollAnimation.kill();
      }

      // Update the target scroll position based on wheel delta, clamped to valid scroll range
      targetScroll = Math.max(
        0,
        Math.min(
          targetScroll + e.deltaY * 1.5,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );

      // Animate scrolling with GSAP, using a smooth easing function
      scrollAnimation = gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: targetScroll, autoKill: true },
        ease: "power2.out",
      });
    },
    { passive: false }, // Ensure we can call e.preventDefault()
  );
};
