import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Color de marca: cambiar aquí cambia toda la app
        brand: colors.indigo,
        // Acento exclusivo para elementos de IA
        ia: colors.violet,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '0.75rem',
      },
    },
  },
  plugins: [],
};