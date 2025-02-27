import { gsap } from "./gsap-config";

export function baseLightFadeIn() {
  const tl = gsap.timeline({
    defaults: {
      ease: "power2.out",
      delay: 0.5,
    },
  });
  tl.to(".topRightBg", { opacity: 1, duration: 1 });
}
