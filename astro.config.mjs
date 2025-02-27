import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      // Optimize build chunks
      rollupOptions: {
        output: {
          manualChunks: {
            // Bundle GSAP and its plugins together
            gsap: ["gsap", "gsap/ScrollTrigger", "gsap/ScrollToPlugin"],
            // Group your animation files
            animations: [
              "./src/assets/js/gsap-config.js",
              "./src/assets/js/home-animations.js",
              "./src/assets/js/cursor-animation.js",
              "./src/assets/js/light-fade-in.js",
              "./src/assets/js/mobile-menu.js",
              "./src/assets/js/smooth-scroll.js",
            ],
          },
        },
      },
      // Minification options
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    // Optimize dependency handling
    optimizeDeps: {
      include: ["gsap"],
    },
    // CSS optimization
    css: {
      devSourcemap: true,
    },
  },
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
});
