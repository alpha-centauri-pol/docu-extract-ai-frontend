const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use the CSS variable for Inter
        'neue-montreal': ['var(--font-neue-montreal)', ...fontFamily.sans],
        // Use the CSS variable for PP Neuebit
        'neuebit': ['var(--font-neuebit)', ...fontFamily.sans],
      },
      colors: {
        'primary-dark': '#0C0F1D',
        'card-dark': '#1b2531',
        'row-dark': '#121A27',
        primary: '#FFFFFF',
        'primary-inactive': '#A0A0A0',
        secondary: '#C684F6',
        tertiary: '#97F0E5',
        'walrus-green': '#97F0E5',
        'status-active': '#8FD585',
      },
      padding: {
        'sm': '1rem', 'md': '1.5rem', 'lg': '2rem', 'xl': '2.5rem', '2xl': '3rem', '3xl': '4rem', '4xl': '5rem',
      },
      gap: {
        'xs': '0.5rem', 'sm': '1rem', 'md': '1.5rem', 'lg': '2rem', 'xl': '2.5rem', '2xl': '3rem', '3xl': '4rem',
      },
      borderRadius: {
        'sm': '0.25rem', '2xs': '0.375rem', '3xs': '0.5rem', '4xs': '0.75rem',
      },
      opacity: { '30': '0.3' }
    },
  },
  plugins: [],
};