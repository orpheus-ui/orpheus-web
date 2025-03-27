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
  // Add a flag to track TOC link clicks
  let isTocLinkActive = false;
  let tocTargetY = null;

  const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

  const updateScroll = () => {
    // If TOC link is active, don't interfere with its scrolling
    if (isTocLinkActive) {
      if (tocTargetY !== null) {
        // If we have a TOC target, ensure we're at that position
        window.scrollTo(0, tocTargetY);
      }
      animationFrame = requestAnimationFrame(updateScroll);
      return;
    }

    currentY = lerp(currentY, targetY, 0.04); // Adjust the 0.1 value to change smoothness

    if (Math.abs(targetY - currentY) > 1) {
      window.scrollTo(0, currentY);
      animationFrame = requestAnimationFrame(updateScroll);
    } else {
      window.scrollTo(0, targetY);
      animationFrame = null;
    }
  };

  const handleWheel = (e) => {
    // If TOC link is active, don't process wheel events
    if (isTocLinkActive) {
      e.preventDefault();
      return;
    }

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

  // Add a method to handle TOC link clicks
  window.handleTocLinkClick = (headingId) => {
    const targetElement = document.getElementById(headingId);
    if (!targetElement) return;

    // Set the TOC link active flag
    isTocLinkActive = true;
    
    // Calculate target position with offset
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100;
    
    // Smooth scroll to the heading
    smoothScrollToHeading(targetPosition, 800, () => {
      // Update URL hash without triggering scroll
      history.pushState(null, null, `#${headingId}`);
      
      // Keep the position locked for a moment
      setTimeout(() => {
        // Update the target for the main scroll animation
        targetY = window.scrollY;
        currentY = window.scrollY;
        tocTargetY = null;
        
        // Release the TOC lock after a delay
        setTimeout(() => {
          isTocLinkActive = false;
        }, 100);
      }, 400);
    });
  };

  // Smooth scroll function specifically for TOC links
  function smoothScrollToHeading(targetPosition, duration, callback) {
    const startY = window.scrollY;
    const difference = targetPosition - startY;
    const startTime = performance.now();
    
    function step(currentTime) {
      const elapsedTime = currentTime - startTime;
      
      if (elapsedTime < duration) {
        // Easing function: easeInOutQuad
        const progress = elapsedTime / duration;
        const easeProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        tocTargetY = startY + difference * easeProgress;
        window.scrollTo(0, tocTargetY);
        requestAnimationFrame(step);
      } else {
        tocTargetY = targetPosition;
        window.scrollTo(0, targetPosition);
        if (callback) callback();
      }
    }
    
    requestAnimationFrame(step);
  }

  // Cleanup function
  return () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    window.removeEventListener("wheel", handleWheel);
    // Clean up the global method
    delete window.handleTocLinkClick;
  };
};
