/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '600px',
        'md': '960px',
        'lg': '1280px',
        'xl': '1920px',
      },
      colors: {
        'primary': 'var(--primary-color)',
        'gray': 'var(--surface-300)',
        'surface-ground': 'var(--surface-ground)',
        'surface-border': 'var(--surface-border)',
        'surface-hover': 'var(--surface-hover)',
      }
    },
  },
  plugins: [],
};
