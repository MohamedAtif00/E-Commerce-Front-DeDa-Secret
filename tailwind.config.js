/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
    {
    relative: true,
    transform: (content) => content.replace(/taos:/g, ''),
    files: ['./src/*.{html,js}'],
  },
  ],
  theme: {
    extend: {
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateY(60%)', opacity: '0', visibility: 'hidden' },
          '1%': {visibility:'visible'},
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },animation: {
        slideInLeft: 'slideInLeft 1s ease-out',
      },// Adding custom delay utilities
      animationDelay: {
        '1s': '1s',
        '2s': '2s',
        '3s': '3s',
      },
      colors:{
        'back-color':'#fefdfc',
        'card-color':'#fff',
        'card-font-color':'#808080',
        'font-color':'#283034',
        'btn-color':'#efa697'
      },fontFamily:{
        'primary':'Lustria',
        'secondry':'Alex Brush',
        'inter': 'inter',
        'Merienda':'Merienda'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts:true
    }),
    require('taos/plugin')

  ],
   safelist: [
    '!duration-[0ms]',
    '!delay-[0ms]',
    'html.js :where([class*="taos:"]:not(.taos-init))'
  ]
}

