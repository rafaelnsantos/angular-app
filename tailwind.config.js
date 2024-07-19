const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: process.env.TAILWIND_MODE ? 'jit' : undefined,
  purge: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    fontFamily: {
      ...fontFamily,
      sans: ["Roboto", "Helvetica Neue", "sans-serif", ...fontFamily.sans],
    },
    screens: {
      'sm': '600px',
      'md': '960px',
      'lg': '1280px',
      'xl': '1920px',
    },
    // TODO: Add material color palette
  },
  plugins: [],
};
