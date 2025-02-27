import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            gsap: ["gsap", "gsap/ScrollTrigger", "gsap/ScrollToPlugin"],
          },
        },
      },
    },
    optimizeDeps: {
      include: ["gsap"],
    },
    ssr: {
      noExternal: ["gsap"],
    },
  },
});
