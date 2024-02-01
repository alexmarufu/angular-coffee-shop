/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        red: {
          DEFAULT: "#FF0000",
        },
        grey: {
          DEFAULT: "#f9f9f9",
          100: "#d3d3d3",
          200: "#8f8f8f"
        },
        blue: {
          DEFAULT: "#1F51FF",
        },
      }
    },
  },
  plugins: [],
}

