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
      sky: colors.sky,
      blue: colors.blue,
      orange: colors.orange,
      teal: colors.teal,
      green: colors.green,

      granate: {
        50: '#fce8e8',
        100: '#f9c6c6',
        200: '#f49e9e',
        300: '#ef7676',
        400: '#ea5555',
        500: '#e62d2d',
        600: '#d40e0e',
        700: '#b80c0c',
        800: '#930909',
        900: '#780707',
      },
      'white': '#ffffff',
      'gris': '#999999',
      'grisclaro': '#d6d6d6',
      'azul': '#141E42',
      'black': '#000000',
      'granate-claro': '#942129',
      // Configure your color palette here
    }
  },
  plugins: [],
}



