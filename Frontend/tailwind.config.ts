import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1f6feb',
          foreground: '#ffffff'
        },
        surface: '#0d1117',
        accent: '#ffb86c'
      }
    }
  },
  plugins: []
};

export default config;

