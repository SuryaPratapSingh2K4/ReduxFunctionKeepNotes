/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#d51f06',
        customLightGray: '#fbfbfb',
      }
    },
  },
  plugins: [],
}