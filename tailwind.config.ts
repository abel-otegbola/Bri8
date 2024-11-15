import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#9B7EBD",
        "secondary": "#D4BEE4",
        "tetiary": "#EEEEEE",
        "dark": "#3D3346",
        "black": "#161620",
        "blue": "#1e2e47"
      },
      boxShadow: {
        "input-active" : "0px 0px 12px 0px #633CFF40"
      },
      animation: {
        "spin-slow": "wiggle 0.7s linear finite",
      },
      keyframes: {
        wiggle: {
          "0%": {
            transform: "rotate(-35deg)",
          },
          "100%": {
            transform: "rotate(5deg)",
          },
        },
      }
    },
  },
  plugins: [],
};

export default config;
