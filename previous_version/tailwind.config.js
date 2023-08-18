/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.ejs', './views/partial/*.ejs'],
  theme: {
    container:{
      center: true,
      padding: '16px'
    },
    extend: {
      colors: {
        primary: '#14b8a6'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      screens: {
        '2xl': '1320px'
      }
    },
  },
  plugins: [],
}

