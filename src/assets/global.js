// GSAP Animations
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const cursorFollower = document.querySelector(".cursor-follower");
let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let mouse = { x: pos.x, y: pos.y };
let speed = 0.1;
const menuButton = document.querySelectorAll("a");
let fpms = 60 / 280;

let xSet = gsap.quickSetter(cursorFollower, "x", "px");
let ySet = gsap.quickSetter(cursorFollower, "y", "px");

/* --------------------------
 * MOUSE TRACKER EVENTS
 * -------------------------- */

document.addEventListener("mouseenter", (e) => {
  gsap.to(".cursor-follower", { duration: 0.2, scale: 1, opacity: 1 });
});

document.addEventListener("mouseleave", (e) => {
  gsap.to(".cursor-follower", { duration: 0.2, scale: 0, opacity: 0 });
});
window.addEventListener("mousemove", (e) => {
  gsap.quickTo(".cursor-follower", { scale: 1, opacity: 1 });
  mouse.x = e.x;
  mouse.y = e.y;

  root.style.setProperty("--mouse-x", mouse.x + "px");
  root.style.setProperty("--mouse-y", mouse.y + "px");
});

/* --------------------------
 * TICKER
 * -------------------------- */
gsap.ticker.add((time, deltaTime) => {
  var delta = deltaTime * fpms;
  var dt = 1.0 - Math.pow(1.0 - speed, delta);

  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});

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

const menuBtn = document.getElementById("menuBtn");
const navItems = gsap.utils.toArray(".nav-item");
let menuOpen = false;

gsap.set(".mobile-menu-wrapper", { yPercent: -100 });
const mobileTl = gsap.timeline().reverse();
mobileTl
  .to(".mobile-menu-wrapper", {
    yPercent: 0,
    opacity: 1,
    ease: "power2.out",
  })
  .from(navItems, {
    y: -10,
    autoAlpha: 0,
    duration: 0.5,
    stagger: 0.065,
  });
menuBtn.addEventListener("click", () => {
  if (menuOpen) {
    mobileTl.reversed(menuOpen);
    menuOpen = false;
  } else {
    mobileTl.reversed(menuOpen);
    menuOpen = true;
  }
});

const mm = gsap.matchMedia();

mm.add("(max-width: 768px)", () => {
  mobileTl.pause(0).reverse();
  return () => {
    mobileTl.pause(0).reverse();
    menuOpen = false;
  };
});
