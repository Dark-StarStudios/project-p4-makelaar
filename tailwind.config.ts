import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f8eeee",
        ink: "#1f1b18",
        honey: "#ffc139",
        clay: "#c9b8ad"
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"]
      },
      boxShadow: {
        soft: "0 2px 8px rgba(35, 27, 20, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
