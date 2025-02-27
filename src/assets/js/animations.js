// src/assets/js/animations.js
import { initCursor } from "./cursor-animation";
import { initMobileMenu } from "./mobile-menu";
import { initSmoothScroll } from "./smooth-scroll";
import { baseLightFadeIn } from "./light-fade-in";

export function initAllAnimations() {
  initCursor();
  initMobileMenu();
  initSmoothScroll();
  baseLightFadeIn();
}
