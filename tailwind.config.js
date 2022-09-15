/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16ABF8",
        trans: "#888888",
        danger: "#ED4C5C",
        veryHigh: "#ED4C5C",
        high: "#F8A541",
        normal: "#00A790",
        low: "#428BC1",
        veryLow: "#8942C1",
      },
    },
  },
  plugins: [],
};
