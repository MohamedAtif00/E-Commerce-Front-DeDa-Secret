/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        'back-color':'#fefdfc',
        'card-color':'#fff',
        'card-font-color':'#808080',
        'font-color':'#283034',
        'btn-color':'#efa697'
      },fontFamily:{
        'primary':'Lustria',
        'secondry':'Alex Brush',
        'inter':'inter'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

