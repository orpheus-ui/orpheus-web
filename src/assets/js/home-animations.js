import { gsap } from "./gsap-config";

export function initHeroAnimations() {
  const tl = gsap.timeline({
    defaults: {
      ease: "power2.out",
    },
  });

  tl.fromTo(
    ".heroImg",
    { x: 200, opacity: 0, scale: 0.95 },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2,
    },
  )
    .fromTo(
      ".heroTitle",
      { x: -150, opacity: 0, rotation: -5 },
      { x: 0, opacity: 1, rotation: 0, duration: 1.3, ease: "power3.out" },
      "-=0.8",
    )
    .fromTo(
      ".heroTxt",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8",
    )
    .fromTo(
      ".heroBtn",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.3 },
      "-=0.7",
    );
}

export function initScrollAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.utils.toArray(".banner-title").forEach((section) => {
      gsap.set(section, { opacity: 1, filter: "blur(0px)", y: 0 });
    });
    return;
  }

  const sections = gsap.utils.toArray(".banner-title");
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0.5, filter: "blur(2px)", y: 100 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 60%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      },
    );
  });
}

export function animateButtonGradient() {
  const tl = gsap.timeline({
    repeat: -1,
    defaults: { ease: "none" },
  });

  tl.to(".btn-secondary", {
    "--gradient-pos-x": "100%",
    "--gradient-pos-y": "0%",
    duration: 2,
  })
    .to(".btn-secondary", {
      "--gradient-pos-x": "100%",
      "--gradient-pos-y": "100%",
      duration: 0.7,
    })
    .to(".btn-secondary", {
      "--gradient-pos-x": "0%",
      "--gradient-pos-y": "100%",
      duration: 2,
    })
    .to(".btn-secondary", {
      "--gradient-pos-x": "0%",
      "--gradient-pos-y": "0%",
      duration: 0.7,
    });
}

export function homeBg() {
  const tl = gsap.timeline({
    defaults: {
      ease: "power2.out",
      delay: 1,
    },
  });
  tl.to(".bgHome", { opacity: 1, stagger: { amount: 0.5 } });
}
