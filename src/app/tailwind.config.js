/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#1F51FF",
        },
      }
    },
  },
  plugins: [],
}

