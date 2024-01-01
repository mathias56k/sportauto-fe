/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'themeColors': {
        bg: '#27242B',
        text: '#FFFFFF',
        'bg-2': '#3C3940',
      }
    },
    extend: {},
  },
  plugins: [],
}

