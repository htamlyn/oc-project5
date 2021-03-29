const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    mode:'layers',
    content:['./public/**/*.html']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      fontFamily: {
        dancingScript : ['Dancing Script', 'cursive'],
      }
    },
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
