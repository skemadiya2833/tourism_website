import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/theme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      extend: {
        fontFamily: {
          caveat: ['Caveat', "cursive"],
          Prata: ["Prata", "serif"],
          lora: ["Lora"],
        },
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
          "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
        keyframes: {
          "text-clip": {
            "0%": {
              "clip-path": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            "100%": { "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
          },
          "outer-left": {
            "0%": { transform: "translateX(50%)" },
            "100%": { transform: "none" },
          },
          "inner-left": {
            "0%": { transform: "translateX(-50%)" },
            "100%": { transform: "none" },
          },
          "image-in": {
            "0%": { "clip-path": "polygon(0 0, 100% 0, 100% 0, 0 0)" },
            "100%": { "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
          },
          "move-it": {
            "0%, 90%, 100%": { transform: "translateY(2%)" },
            "45%": { transform: "translateY(-50%)" },
          },
          "move-it-2": {
            "0%, 90%, 100%": { transform: "translateY(-50%)" },
            "45%": { transform: "translateY(5%)" },
          },
          hoverScaleRotate: {
            "0%, 100%": {
              transform: "scale(1) rotate(0deg)",
            },
            "50%": {
              transform: "scale(1.25) rotate(-5deg)",
            },
          },
          hoverMoveButton: {
            "0%, 100%": {
              transform: "translateY(50%)",
            },
            "50%": {
              transform: "translateY(0)",
            },
          },
          bounce: {
            "0%, 50%, 100%": { transform: "translateY(0)" },
            "25%": { transform: "translateY(-20px)" },
          },
        },
        animation: {
          "move-it": "move-it 60s ease alternate infinite 5s",
          "move-it-2": "move-it-2 65s ease alternate infinite 5s",
          "hover-scale-rotate": "hoverScaleRotate 0.2s ease-in-out",
          "hover-move-button": "hoverMoveButton 0.2s ease-in-out",
          "text-clip": "text-clip 1s cubic-bezier(0.5, 0, 0.1, 1) both",
          "outer-left": "outer-left 1s cubic-bezier(0.5, 0, 0.1, 1) both",
          "inner-left": "inner-left 1s cubic-bezier(0.5, 0, 0.1, 1) both",
          "image-in": "image-in 1s cubic-bezier(0.5, 0, 0.1, 1) 2s backwards",
          bounce: "bounce 3s infinite",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
