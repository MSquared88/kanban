/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
    },
    extend: {
      colors: {
        purple: {
          primary: '#635FC7',
          hover: '#A8A4FF',
        },
        black: '#000112',
        red: {
          primary: '#EA5555',
          hover: '#FF9898',
        },
        gray: {
          darkest: '#20212C',
          dark: '#2B2C37',
          medium: '#828FA3',
          light: '#F4F7FD',
        },
        lines: {
          dark: '#3E3F4E',
          light: '#E4EBFA',
        },
      },
    },
  },
  plugins: [],
}
