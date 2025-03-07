export const initSmoothScroll = () => {
  // Disable on mobile or if user prefers reduced motion
  if (
    window.innerWidth < 768 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;

  let targetY = window.scrollY;
  let currentY = window.scrollY;
  let animationFrame;

  const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

  const updateScroll = () => {
    currentY = lerp(currentY, targetY, 0.05); // Adjust the 0.1 value to change smoothness

    if (Math.abs(targetY - currentY) > 1) {
      window.scrollTo(0, currentY);
      animationFrame = requestAnimationFrame(updateScroll);
    } else {
      window.scrollTo(0, targetY);
      animationFrame = null;
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();

    // Calculate new target position
    targetY = Math.max(
      0,
      Math.min(
        targetY + e.deltaY,
        document.documentElement.scrollHeight - window.innerHeight,
      ),
    );

    // Start animation if not already running
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(updateScroll);
    }
  };

  window.addEventListener("wheel", handleWheel, { passive: false });

  // Cleanup function
  return () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    window.removeEventListener("wheel", handleWheel);
  };
};
