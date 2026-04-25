/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#161616',
        coal: '#2a2a2a',
        paper: '#f8f7f2',
        line: '#e7e1d2',
        gold: '#c79a2b',
        amberSoft: '#fff6db',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 14px 40px -30px rgba(22, 22, 22, 0.45)',
      },
    },
  },
  plugins: [],
}
