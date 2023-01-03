/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,scss}",
  ],
  theme: {
    fontFamily: {
      san: ['Prompt'],
      serif: ['Prompt'],
      display: ['Prompt']
    },
    extend: {
      textColor: {
        'default': '#aaa'
      },
    },
  },
  plugins: [],
}
