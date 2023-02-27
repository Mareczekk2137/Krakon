/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  important: false,

  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),

  ],
}
