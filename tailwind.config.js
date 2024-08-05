/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        purp: '#AA8CED',
        darkpurp: '#8159DB',
      },
    },
  },
  plugins: [],
};
