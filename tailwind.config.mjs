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
      zircon: {
        50: "#eff3fb",
        100: "#e2e9f7",
        200: "#ccd8f1",
        300: "#a8bfe8",
        400: "#7f9edb",
        500: "#607fd1",
        600: "#4d66c3",
        700: "#4254b3",
        800: "#3b4692",
        900: "#343d74",
        950: "#232848",
      },
      red: {
        50: "#fef2f2",
        100: "#ffe1e1",
        200: "#ffc8c8",
        300: "#ffa2a2",
        400: "#fd6c6c",
        500: "#f54242",
        600: "#e22020",
        700: "#be1717",
        800: "#9d1717",
        900: "#821a1a",
        950: "#470808",
      },
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
