/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#F97316",
          dark: "#EA580C",
          light: "#FFF7ED",
        },
      },
    },
  },
  plugins: [],
};