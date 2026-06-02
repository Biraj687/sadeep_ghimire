/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      colors: {
        darkBg: "#030303",
        darkCard: "#0b0b0b",
        darkCardHover: "#121212",
        darkBorder: "#1c1c1c",
        neonCyan: "#00ffff",
        neonViolet: "#a855f7",
        neonEmerald: "#10b981",
        neonRose: "#f43f5e",
      },
      boxShadow: {
        glowCyan: "0 0 15px rgba(0, 255, 255, 0.15), 0 0 30px rgba(0, 255, 255, 0.05)",
        glowViolet: "0 0 15px rgba(168, 85, 247, 0.15), 0 0 30px rgba(168, 85, 247, 0.05)",
        glowEmerald: "0 0 15px rgba(16, 185, 129, 0.15), 0 0 30px rgba(16, 185, 129, 0.05)",
        glowBorderCyan: "inset 0 0 8px rgba(0, 255, 255, 0.2)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
