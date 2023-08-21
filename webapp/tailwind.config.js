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
  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(['mdi'])
    })
  ],
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
