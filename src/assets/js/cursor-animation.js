import { gsap } from "./gsap-config";

export function initCursor() {
  if (window.matchMedia("(hover: none)").matches) return;

  const cursorFollower = document.querySelector(".cursor-follower");

  gsap.set(cursorFollower, {
    opacity: 0,
    width: 16,
    height: 16,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgb(226 183 102 / 65%)",
  });

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let pos = { x: mouse.x, y: mouse.y };

  const speed = 0.1;
  const xSetter = gsap.quickSetter(cursorFollower, "x", "px");
  const ySetter = gsap.quickSetter(cursorFollower, "y", "px");

  let isMouseMoved = false;
  window.addEventListener("mousemove", (e) => {
    if (!isMouseMoved) {
      isMouseMoved = true;
      gsap.to(cursorFollower, {
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    }

    mouse.x = e.x;
    mouse.y = e.y;
  });

  gsap.ticker.add(() => {
    const deltaX = mouse.x - pos.x;
    const deltaY = mouse.y - pos.y;
    pos.x += deltaX * speed;
    pos.y += deltaY * speed;

    xSetter(pos.x);
    ySetter(pos.y);
  });

  const interactiveElements = document.querySelectorAll(
    "a, button, .hover-target",
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cursorFollower, {
        width: 68,
        height: 68,
        backgroundColor: "rgb(226, 183, 102)",
        borderWidth: 2,
        opacity: 1,
        ease: "power4.out",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(cursorFollower, {
        width: 16,
        height: 16,
        backgroundColor: "transparent",
        borderWidth: 1,
        opacity: 0.75,
        ease: "power3.out",
      });
    });
  });
}
