import { gsap } from "./gsap-config";

export function initHeroAnimations() {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  // Animate each element separately but more efficiently
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
      { x: 0, opacity: 1, rotation: 0, duration: 1.3 },
      "-=0.8", // Overlap with previous animation
    )
    .fromTo(
      ".heroTxt",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.8", // Overlap with previous animation
    )
    .fromTo(
      ".heroBtn",
      { x: -120, opacity: 0, scale: 1, rotateZ: 0, z: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        clearProps: "scale",
      },
      "-=0.7", // Overlap with previous animation
    );
}

export function initScrollAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".banner-title").forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    });
    return;
  }

  // Use a single ScrollTrigger for all banner titles to reduce overhead
  gsap.utils.toArray(".banner-title").forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0.5, y: 100 },
      {
        opacity: 1,
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

  // Combine similar parallax effects
  const parallaxElements = [
    { selector: ".bgHome:first-child", yValue: 600 },
    { selector: ".bgHome.rotate-180", yValue: -600 },
  ];

  // Create one ScrollTrigger for both parallax effects
  const parallaxTrigger = {
    trigger: "main",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  };

  parallaxElements.forEach(({ selector, yValue }) => {
    gsap.to(selector, {
      y: yValue,
      ease: "none",
      scrollTrigger: parallaxTrigger,
    });
  });
}

export function homeBg() {
  setTimeout(() => {
    document.querySelectorAll(".bgHome").forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("show");
      }, i * 125); // Approximates the stagger effect
    });
  }, 1000); // 1 second delay
}
