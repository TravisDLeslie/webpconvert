/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      }, // Add a comma here to separate fontFamily from colors
      colors: {
        purp: '#AA8CED',
        darkpurp: '#8159DB',
      },
    },
  },
  plugins: [],
};
