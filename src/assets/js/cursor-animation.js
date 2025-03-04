export function initCursor() {
  if (window.matchMedia("(hover: none)").matches) return;

  const cursorFollower = document.querySelector(".cursor-follower");

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
    transition: "width 0.3s, height 0.3s, background-color 0.3s, border-width 0.3s, opacity 0.3s",
    transform: "translate(-50%, -50%)" // This centers the element on the cursor
  });

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let pos = { x: mouse.x, y: mouse.y };
  let animationFrame;
  const speed = 0.25; // Slightly increased for more responsive following

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
  const interactiveElements = document.querySelectorAll("a, button, .hover-target");

  const expandedStyles = {
    width: "68px",
    height: "68px",
    backgroundColor: "rgb(226, 183, 102)",
    borderWidth: "2px",
    opacity: "1"
  };

  const normalStyles = {
    width: "16px",
    height: "16px",
    backgroundColor: "transparent",
    borderWidth: "1px",
    opacity: "0.75"
  };

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      Object.assign(cursorFollower.style, expandedStyles);
    });

    el.addEventListener("mouseleave", () => {
      Object.assign(cursorFollower.style, normalStyles);
    });
  });

  // Cleanup function
  return () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  };
}
