const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    mode:'layers',
    content:['./public/**/*.html']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      violet: colors.violet,
      red: colors.red,
      cyan: colors.cyan,
      teal: colors.teal,
      blue: colors.blue,
      rose: colors.rose,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
