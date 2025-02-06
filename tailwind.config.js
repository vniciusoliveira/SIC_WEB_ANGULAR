/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'greenTMKT': '#25854d',
        'greenConfirmacao': "#25C24D"
      },
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

