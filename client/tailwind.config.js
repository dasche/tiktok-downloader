/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container:{
      padding: '24px',
      center: true
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    },
    extend: {
      animation: {
        shake: 'shake 0.2s ease'
      },
      keyframes: {
        shake: {
          '0%': {transform: 'translateX(4px)'},
          '25%': {transform: 'translateX(-4px)'},
          '50%': {transform: 'translateX(4px)'},
          '100%': {transform: 'translateX(0)'},
        }
      },
      colors: {
        primary: '#14b8a6'
      },
      screens: {
        '2xl': '1280px'
      }
    },
  },
  plugins: [],
};
