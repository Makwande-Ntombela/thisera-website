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
          orange: '#D94A26', // Approximated from your screenshots
          dark: '#333333',
          light: '#f4f4f4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Ensure you have a nice font loaded in index.html or use system default
      }
    },
  },
  plugins: [],
}