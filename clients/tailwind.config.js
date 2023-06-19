/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./projects/@sn/**/*.{html,ts}",
    "./projects/user/src/**/*.{html,ts}",
    "./projects/admin/src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      primary: colors.teal,
      info: colors.sky,
      success: colors.green,
      warning: colors.amber,
      danger: colors.red,
      ...colors
    },
    extend: {},
  },
  plugins: [],
}

