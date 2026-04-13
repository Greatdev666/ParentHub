import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: { 
          orange: "#FF5E33", 
          teal: "#00838F", 
          navy: "#1A2530", 
          cream: "#F7F5F0",
          dark: "#0F1419",
          "dark-card": "#1A2332",
          "dark-border": "#2A3545",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      boxShadow: {
        "card": "0 1px 3px rgba(26,37,48,0.06), 0 6px 16px rgba(26,37,48,0.04)",
        "card-hover": "0 4px 12px rgba(26,37,48,0.1), 0 16px 32px rgba(26,37,48,0.06)",
        "card-dark": "0 1px 3px rgba(0,0,0,0.3), 0 6px 16px rgba(0,0,0,0.2)",
        "card-dark-hover": "0 4px 12px rgba(0,0,0,0.4), 0 16px 32px rgba(0,0,0,0.3)",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
