/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      indigo: colors.indigo,
      violet: colors.violet,
      emerald: colors.emerald,
      amber: colors.amber,
      gray: colors.gray,
      yellow: colors.yellow,
      red: colors.red,
      'granate': '#5e151d',
      'white': '#ffffff',
      'gris': '#999999',
      'grisclaro': '#d6d6d6',
      'blue': '#141E42',
      'black': '#000000',
      // Configure your color palette here
    }
  },
  plugins: [],
}



