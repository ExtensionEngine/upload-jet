/** @type {import('tailwindcss').Config} */

const {
  iconsPlugin,
  getIconCollections
} = require('@egoist/tailwindcss-icons');

module.exports = {
  content: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue'],
  theme: {
    extend: {}
  },
  plugins: [],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  }
};
