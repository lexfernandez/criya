module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'pale-silver': '#CEC5B2',
      'cultured': '#FAF8F4',
      'white': '#ffffff',
      'black': '#000000',
      'outer-space': '#283E39 ',
      'pear': '#c4dd2b ',
      'platinum': '#E5E5E5',
      'tropical-rain-forest': '#006063',
    },
    extend: {
      fontFamily:{
        'monserrat': 'Montserrat, sans-serif'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
