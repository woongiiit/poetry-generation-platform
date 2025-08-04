import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hanji': {
          50: '#fefefe',
          100: '#fdfcfb',
          200: '#faf8f5',
          300: '#f5f1eb',
          400: '#ede7df',
          500: '#e0d8cc',
          600: '#d1c5b5',
          700: '#b8a894',
          800: '#9a8b73',
          900: '#7d6f5a',
        },
        'ink': {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#0d1117',
        }
      },
      fontFamily: {
        'serif': ['Noto Serif KR', 'serif'],
        'sans': ['Noto Sans KR', 'sans-serif'],
      },
      backgroundImage: {
        'hanji-texture': "url('/hanji-texture.png')",
      }
    },
  },
} satisfies Config 