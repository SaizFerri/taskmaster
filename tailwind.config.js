/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#fcb069',
        foreground: '#1a1a1a',
        ['foreground-button']: '#2D1037',
        border: '#E2E8F1',
        brand: {
          50: '#fff6ed',
          100: '#ffecd5',
          200: '#fed5aa',
          300: '#fcb069',
          400: '#fa8d3d',
          500: '#f86d17',
          600: '#e9520d',
          700: '#c13c0d',
          800: '#993013',
          900: '#7b2a13',
          950: '#431207'
        }
      },
      animation: {
        fade: 'fadeIn 50ms linear'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        }
      }
    }
  },
  plugins: []
}
