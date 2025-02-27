import { gsap } from "./gsap-config";

export const initSmoothScroll = () => {
  // Disable custom smooth scroll on mobile devices or if user prefers reduced motion
  if (
    window.innerWidth < 768 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;

  let targetScroll = window.scrollY;
  let currentScroll = window.scrollY;
  let scrollAnimation;

  // Function to handle wheel event
  const handleWheel = (e) => {
    e.preventDefault();

    // Kill any ongoing animation
    if (scrollAnimation) {
      scrollAnimation.kill();
    }

    // Calculate new scroll position
    targetScroll = Math.max(
      0,
      Math.min(
        targetScroll + e.deltaY * 1.5,
        document.documentElement.scrollHeight - window.innerHeight,
      ),
    );

    // Animate to new position
    scrollAnimation = gsap.to(window, {
      scrollTo: targetScroll,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  // Add wheel event listener with passive: false
  window.addEventListener("wheel", handleWheel, { passive: false });

  // Optional: Clean up function
  return () => {
    window.removeEventListener("wheel", handleWheel);
  };
};
