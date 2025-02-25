import { gsap } from "./gsap-config";

export function initHeroAnimations() {
  // GSAP Timeline
  let tl = gsap.timeline({
    defaults: {
      ease: "power4.inOut",
      duration: 3,
    },
  });

  tl.fromTo(
    ".heroImg",
    { x: 200, opacity: 0, duration: 1, delay: 2 },
    { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
  )
    .fromTo(
      ".heroTitle",
      { x: -200, opacity: 0, duration: 1.5 },
      { x: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power3.out" },
      "-=1.2",
    )
    .fromTo(
      ".heroTxt",
      { opacity: 0, y: 100, duration: 1 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=1",
    )
    .fromTo(
      ".heroBtn",
      { x: -100, opacity: 0, stagger: 1.5, duration: 1 },
      { x: 0, opacity: 1, stagger: 0.5, duration: 1 },
      "-=1",
    );
}

export function initScrollAnimations() {
  var sections = gsap.utils.toArray(".banner-title");
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0.5, filter: "blur(2px)", y: 100 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        scrollTrigger: {
          trigger: section,
          start: "-=1000",
          end: "-=800",
          scrub: 1,
          toggleActions: "play pause resume reset",
        },
      },
    );
  });
}
