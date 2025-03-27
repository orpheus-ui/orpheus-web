export function initCursor() {
  if (window.matchMedia("(hover: none)").matches) return;

  const cursorFollower = document.querySelector(".cursor-follower");
  if (!cursorFollower) return; // Safety check if element doesn't exist

  // Initial styles
  Object.assign(cursorFollower.style, {
    opacity: "0",
    width: "16px",
    height: "16px",
    backgroundColor: "transparent",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgb(226 183 102 / 65%)",
    borderRadius: "50%",
    position: "fixed",
    pointerEvents: "none",
    transition:
      "width 0.4s, height 0.4s, background-color 0.4s, border-width 0.4s, opacity 0.4s",
    transform: "translate(-50%, -50%)", // This centers the element on the cursor
  });

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let pos = { x: mouse.x, y: mouse.y };
  let animationFrame;
  const speed = 0.08; // Slightly increased for more responsive following

  function updateCursor() {
    // Calculate new position with lerp
    pos.x += (mouse.x - pos.x) * speed;
    pos.y += (mouse.y - pos.y) * speed;

    // Apply new position with translate(-50%, -50%) to center the circle
    cursorFollower.style.left = `${pos.x}px`;
    cursorFollower.style.top = `${pos.y}px`;

    animationFrame = requestAnimationFrame(updateCursor);
  }

  let isMouseMoved = false;
  window.addEventListener("mousemove", (e) => {
    if (!isMouseMoved) {
      isMouseMoved = true;
      cursorFollower.style.opacity = "1";
    }

    mouse.x = e.x;
    mouse.y = e.y;
  });

  // Start animation
  animationFrame = requestAnimationFrame(updateCursor);

  // Interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .hover-target",
  );
  const inputElements = document.querySelectorAll(
    "input, textarea, select, [contenteditable='true']",
  );

  const expandedStyles = {
    width: "68px",
    height: "68px",
    backgroundColor: "rgb(226, 183, 102)",
    borderWidth: "2px",
    opacity: "1",
  };

  const normalStyles = {
    width: "16px",
    height: "16px",
    backgroundColor: "transparent",
    borderWidth: "1px",
    opacity: "0.75",
  };

  const hiddenStyles = {
    opacity: "0",
    width: "0px",
    height: "0px",
  };

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      Object.assign(cursorFollower.style, expandedStyles);
    });

    el.addEventListener("mouseleave", () => {
      Object.assign(cursorFollower.style, normalStyles);
    });
  });

  // Handle input elements - fade out cursor when hovering inputs
  inputElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      Object.assign(cursorFollower.style, hiddenStyles);
    });

    el.addEventListener("mouseleave", () => {
      Object.assign(cursorFollower.style, normalStyles);
    });
  });

  // Handle document leaving window
  document.addEventListener("mouseleave", () => {
    cursorFollower.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    if (isMouseMoved) {
      cursorFollower.style.opacity = "0.75";
    }
  });

  // Handle Giscus comments section
  const handleGiscusElements = () => {
    // Target the giscus wrapper and any iframes within it
    const giscusWrapper = document.querySelector('.giscus-wrapper');
    if (!giscusWrapper) return;
    
    // Add event listener to the wrapper
    giscusWrapper.addEventListener('mouseenter', () => {
      Object.assign(cursorFollower.style, hiddenStyles);
    });
    
    giscusWrapper.addEventListener('mouseleave', () => {
      Object.assign(cursorFollower.style, normalStyles);
    });
    
    // Also handle any iframes that might be dynamically added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const iframes = giscusWrapper.querySelectorAll('iframe');
          iframes.forEach((iframe) => {
            iframe.addEventListener('mouseenter', () => {
              Object.assign(cursorFollower.style, hiddenStyles);
            });
          });
        }
      });
    });
    
    observer.observe(giscusWrapper, { childList: true, subtree: true });
  };
  
  // Initialize Giscus handling when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleGiscusElements);
  } else {
    handleGiscusElements();
  }

  // Cleanup function
  return () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    // Clean up event listeners
    interactiveElements.forEach((el) => {
      el.removeEventListener("mouseenter", () => {});
      el.removeEventListener("mouseleave", () => {});
    });

    inputElements.forEach((el) => {
      el.removeEventListener("mouseenter", () => {});
      el.removeEventListener("mouseleave", () => {});
    });
  };
}
