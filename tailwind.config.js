/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT")

module.exports = withMT ({
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    './pages/**/*.{js,jsx,ts,tsx}',
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"]
    }
  },
  plugins: [],
})
