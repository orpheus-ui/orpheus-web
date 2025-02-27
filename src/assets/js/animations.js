import { initCursor } from "./cursor-animation";
import {
  initHeroAnimations,
  initScrollAnimations,
  animateButtonGradient,
  homeBg,
} from "./home-animations";
import { baseLightFadeIn } from "./light-fade-in";
import { initMobileMenu } from "./mobile-menu";
import { initSmoothScroll } from "./smooth-scroll";

export function initAllAnimations() {
  // Initialize cursor first
  initCursor();

  // Then other animations
  initHeroAnimations();
  initScrollAnimations();
  animateButtonGradient();
  homeBg();
  baseLightFadeIn();
  initMobileMenu();
  initSmoothScroll();
}
