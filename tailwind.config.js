/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#07090e',
        card: '#0f141f',
        cardSecondary: '#161c2b',
        solana: '#14F195',
        solanaPurple: '#9945FF',
        jupiterOrange: '#F87042',
        jupiterGreen: '#00F0FF',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
