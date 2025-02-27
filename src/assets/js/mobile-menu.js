import { gsap } from "./gsap-config";

export function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const hamburger = menuBtn.querySelector(".ham");
  const navItems = gsap.utils.toArray(".nav-item");
  let menuOpen = false;

  gsap.set(".mobile-menu-wrapper", { yPercent: -100, visibility: "hidden" });

  // Create timelines
  const mobileTl = gsap.timeline().reverse();
  const hamburgerTl = gsap.timeline().reverse();

  // Menu panel animation
  mobileTl
    .to(".mobile-menu-wrapper", {
      yPercent: 0,
      opacity: 1,
      visibility: "visible",
      ease: "power2.out",
    })
    .from(navItems, {
      y: -10,
      autoAlpha: 0,
      visibility: "hidden",
      duration: 0.5,
      stagger: 0.065,
    });

  hamburgerTl
    .to(hamburger, {
      rotation: 45,
      duration: 0.4,
      ease: "power2.inOut",
    })
    .to(
      [
        hamburger.querySelector(".top"),
        hamburger.querySelector(".middle"),
        hamburger.querySelector(".bottom"),
      ],
      {
        duration: 0.4,
        ease: "power2.inOut",
      },
      "<",
    );

  menuBtn.addEventListener("click", () => {
    menuOpen = !menuOpen;
    mobileTl.reversed(!menuOpen);
    hamburgerTl.reversed(!menuOpen);
    hamburger.classList.toggle("active");
  });

  const mm = gsap.matchMedia();

  mm.add("(max-width: 768px)", () => {
    mobileTl.pause(0).reverse();
    hamburgerTl.pause(0).reverse();
    return () => {
      mobileTl.pause(0).reverse();
      hamburgerTl.pause(0).reverse();
      menuOpen = false;
      hamburger.classList.remove("active");
    };
  });
}
