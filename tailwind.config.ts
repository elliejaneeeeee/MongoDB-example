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
        black: "#292929",
        white: "#ffffff",
        pink: {
          50: "#ffe6ee",
          100: "#ffc7d2",
        },
        purple: {
          50: "#eae7ff",
          100: "#d7ceff",
        },
        blue: {
          50: "#ddf2ff",
          100: "#c6d9ff",
        },
        yellow: {
          50: "#ffeee2",
          100: "#ffe0cf",
        },
      },
    },
  },
  plugins: [],
};
export default config;
