import { gsap } from "./gsap-config";

export const initSmoothScroll = () => {
  // Disable custom smooth scroll on mobile devices or if user prefers reduced motion
  if (
    window.innerWidth < 768 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;

  // Use modern window.scrollY for the current scroll position
  let targetScroll = window.scrollY;
  let scrollAnimation;

  window.addEventListener(
    "wheel",
    (e) => {
      // Prevent default scroll so our GSAP animation takes control
      e.preventDefault();

      // Immediately kill any ongoing scroll animation for responsiveness
      if (scrollAnimation) {
        scrollAnimation.kill();
      }

      // Calculate the new target scroll position, clamped between 0 and the maximum scrollable height
      targetScroll = Math.max(
        0,
        Math.min(
          targetScroll + e.deltaY * 1.5, // Adjust multiplier for desired speed
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );

      // Animate the scroll using GSAP's ScrollToPlugin (make sure it's included in gsap-config)
      scrollAnimation = gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: targetScroll, autoKill: true },
        ease: "power2.out",
      });
    },
    { passive: false },
  );
};
