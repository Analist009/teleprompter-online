/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      scale: {
        '98': '0.98',
        '102': '1.02',
        '105': '1.05',
      },
      animation: {
        'fade-in': 'fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-down': 'slide-down 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};