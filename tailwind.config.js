/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    colors: {
      'themeColors': {
        bg: '#27242B',
        text: '#FFFFFF',
        'bg-2': '#3C3940',
        accent: '#F7F402',
      }
    },
    extend: {},
    fontFamily: {
      display: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

