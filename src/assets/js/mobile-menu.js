// src/assets/js/mobile-menu.js
import { gsap } from "./gsap-config";

export function initMobileMenu() {
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
    menuOpen = !menuOpen;
    mobileTl.reversed(!menuOpen);
  });

  const mm = gsap.matchMedia();

  mm.add("(max-width: 768px)", () => {
    mobileTl.pause(0).reverse();
    return () => {
      mobileTl.pause(0).reverse();
      menuOpen = false;
    };
  });
}
