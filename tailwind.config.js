/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1440px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        md: '32px',
        lg: '32px',
      }
    },
    extend: {},
  },
  plugins: [],
}

