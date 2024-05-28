/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    maxWidth: {
      "8xl": "1440px",
    },
    colors: {
      transparent: "transparent",
      dark: "#050607",
      white: "#EFF3FB",
      gold: {
        100: "#FFE5A1",
        200: "#BF841A",
        300: "#FFCD74",
      },
    },
    extend: {
      fontFamily: {
        default: "Montserrat",
        cinzel: "Cinzel",
      },
    },
  },
  plugins: [],
};
