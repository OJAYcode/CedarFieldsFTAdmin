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
        primary: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
        },
        accent: {
          50: "#faf8f5",
          100: "#f4f0e8",
          200: "#e8dcc8",
          300: "#d4c3a3",
          400: "#c0a87e",
          500: "#a68d5f",
          600: "#8a7147",
          700: "#6d5836",
          800: "#4d3e26",
          900: "#332818",
        },
        neutral: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        soft: "0 2px 8px -2px rgba(0, 0, 0, 0.08)",
        card: "0 4px 12px -2px rgba(0, 0, 0, 0.08)",
      },
      letterSpacing: {
        wider: "0.05em",
        widest: "0.1em",
      },
    },
  },
  plugins: [],
};
export default config;
