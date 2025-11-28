import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#f8f5f2",
          100: "#f1ebe5",
          200: "#e4d8cc",
          300: "#d6c3b0",
          400: "#c0a58b",
          500: "#ab8b6d",
          600: "#916f51",
          700: "#775742",
          800: "#5d4436",
          900: "#4c382f"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-sans)"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 24px 60px rgba(0,0,0,0.08)",
        soft: "0 10px 35px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
};

export default config;
