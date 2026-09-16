import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        soc: {
          bg: "#080d1a",
          panel: "#0c1225",
          border: "#1a2540",
          text: "#b8cce0",
          dim: "#3d5470",
          watching: "#00ff9d",
          suspicious: "#f5c400",
          hostile: "#ff6b00",
          critical: "#ff1744"
        }
      },
      fontFamily: {
        mono: ["Consolas", "Monaco", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 24px rgba(0, 255, 157, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
