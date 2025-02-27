import { initCursor } from "./cursor-animation";
import { baseLightFadeIn } from "./light-fade-in";
import { initMobileMenu } from "./mobile-menu";
import { initSmoothScroll } from "./smooth-scroll";

export function initAllAnimations() {
  initCursor();
  initMobileMenu();
  baseLightFadeIn();
  initSmoothScroll();
}
