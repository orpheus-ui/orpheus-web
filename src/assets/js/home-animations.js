import { gsap } from "./gsap-config";

export function initHeroAnimations() {
  const tl = gsap.timeline({
    defaults: {
      ease: "power2.out",
    },
  });

  // Animate hero image with a slight scale effect
  tl.fromTo(
    ".heroImg",
    { x: 200, opacity: 0, scale: 0.95 },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.5,
    },
  )
    // Animate hero title with a subtle rotation for extra flair
    .fromTo(
      ".heroTitle",
      { x: -150, opacity: 0, rotation: -5 },
      { x: 0, opacity: 1, rotation: 0, duration: 1.3, ease: "power3.out" },
      "-=0.8",
    )
    // Animate hero text smoothly rising into view
    .fromTo(
      ".heroTxt",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8",
    )
    // Animate hero buttons with a gentle stagger
    .fromTo(
      ".heroBtn",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.3 },
      "-=0.7",
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
