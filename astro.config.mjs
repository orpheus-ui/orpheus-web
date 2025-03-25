import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
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

    plugins: [tailwindcss()],
  },
});
