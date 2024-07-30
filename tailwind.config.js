/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const mode = "jit";
export const theme = {
  extend: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    colors: {
      "black-100": "#2B2C35",
      "primary-blue": {
        DEFAULT: "#2B59FF",
        100: "#F5F8FF",
      },
      "custom-gray": '#F0F2F5'
    }
  },
};
export const darkMode = "class";
export const plugins = [nextui()];
