// src/assets/js/cursor-animation.js
import { gsap } from "./gsap-config";

export function initCursor() {
  // Check for touch devices FIRST
  if (window.matchMedia("(hover: none)").matches) return;

  const root = document.documentElement;
  const cursorFollower = document.querySelector(".cursor-follower");

  // Rest of your code...
  gsap.set(".cursor-follower", {
    scale: 1,
    opacity: 1,
    width: 16,
    height: 16,
    backgroundColor: "transparent",
    borderWidth: 1,
  });

  let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let mouse = { x: pos.x, y: pos.y };
  let speed = 0.08;
  let fpms = 60 / 280;

  let xSet = gsap.quickSetter(cursorFollower, "x", "px");
  let ySet = gsap.quickSetter(cursorFollower, "y", "px");

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    root.style.setProperty("--mouse-x", mouse.x + "px");
    root.style.setProperty("--mouse-y", mouse.y + "px");
  });

  gsap.ticker.add((time, deltaTime) => {
    var delta = deltaTime * fpms;
    var dt = 1.0 - Math.pow(1.0 - speed, delta);

    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
  });

  const menuButton = document.querySelectorAll("a");
  menuButton.forEach(function (btn) {
    btn.addEventListener("mouseover", (e) => {
      gsap.to(".cursor-follower", {
        width: 86,
        height: 86,
        backgroundColor: "#edc877",
        borderWidth: 0,
        ease: "power3.out",
      });
    });

    btn.addEventListener("mouseout", (e) => {
      gsap.to(".cursor-follower", {
        width: 16,
        height: 16,
        backgroundColor: "transparent",
        borderWidth: 1,
        ease: "power3.out",
      });
    });
  });
}
