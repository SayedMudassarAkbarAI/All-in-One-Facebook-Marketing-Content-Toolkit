import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        fb: {
          blue: "#1877F2",
          "blue-hover": "#166FE5",
          "blue-light": "#E7F3FF",
          dark: "#0F172A",
          surface: "#1E293B",
          border: "#334155",
          light: "#F0F2F5",
          secondary: "#65676B",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(24, 119, 242, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
