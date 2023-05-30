/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./projects/@sn/core/framing/src/**/*.{html,ts}",
    // "./projects/@sn/core/services/src/**/*.{html,ts}",
    "./projects/@sn/shared/components/src/**/*.{html,ts}",
    "./projects/user/src/**/*.{html,ts}",
    // "./projects/admin/src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      primary: colors.teal,
      info: colors.sky,
      warning: colors.amber,
      danger: colors.red,
      ...colors
    },
    extend: {},
  },
  plugins: [],
}

