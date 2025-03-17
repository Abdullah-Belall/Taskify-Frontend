import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        myBlack: "#131718",
        myOrange: "#f15a00",
        myWhite: "#ffffffcc",
        myOverlay: "#000000b5",
        orangeOverlay: "#f15a001c",
      },
    },
  },
  plugins: [],
};
export default config;
