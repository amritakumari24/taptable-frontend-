/**  @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3277e8ff',
        secondary: '#6366F1'
      },
      backgroundColor: {
        DEFAULT: '#723c16ff'
      }
    },
  },
  plugins: [],
}
 