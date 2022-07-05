/**
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#2E4CB7",
      "white-color": "#FFFFFF",
      "text-color": "#4E4E6A",
      "gray-color-1": "#F0F0F0",
      "gray-color-2": "#BFBFBF",
      "gray-color-3": "#595959",
      "gray-color-4": "#373737",
      "border-color-1": "#C8C8C8",
      warning: "#ED9526",
      "bg-1": "#F6F9FF",
      "black-70": "rgba(0, 0, 0, 0.7)",
      "black-60": "rgba(0, 0, 0, 0.6)",
      "gold-2": "#FFDAB8",
      error: "#FF3B30",
      warning: "#FF9500",
      active: "#1F6CB0",
      success: "#10B981",
      black: "#000000",
      "blue-1": "#4E4E6A",
      "blue-2": "#6B7EDF",
      "blue-3": "#2E4CB7",
      "blue-4": "#70A3C4",
      "blue-5": "#E7E8F5",
      disabled: "#BFBFBF",
      cyan: "#278EA5",
    },
    fontSize: {
      12: 12,
      10: 10,
      13: 13,
      14: 14,
      15: 15,
      16: 16,
      17: 17,
      18: 18,
      20: 20,
      22: 22,
      24: 24,
      26: 26,
      28: 28,
      button: 16,
      h1: 60,
      h2: 40,
      h3: 28,
    },
    lineHeight: {
      20: "20px",
      24: "24px",
      26: "26px",
      28: "28px",
    },
    spacing: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      8: 8,
      24: 24,
      48: 48,
      32: 32,
      12: 12,
      8: 8,
      10: 10,
      "modal-width": 610,
    },

    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1240px",
      "2xl": "1536px",
    },
    maxWidth: {
      "modal-width": 610,
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar-hide"),
  ],
}
