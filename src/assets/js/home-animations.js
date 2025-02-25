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
      delay: 0.2,
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
  // Respect users who prefer reduced motion
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
          start: "top 80%", // when the top of the element is at 80% of the viewport height
          end: "top 60%", // when the top of the element is at 60% of the viewport height
          scrub: 1, // smoothly animates the effect as you scroll
          toggleActions: "play none none reverse", // plays on entering and reverses on leaving
        },
      },
    );
  });
}

export function animateButtonGradient() {
  const tl = gsap.timeline({
    repeat: -1,
    defaults: { ease: "none" }, // Shorter duration per segment
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
