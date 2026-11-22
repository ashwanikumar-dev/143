import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#FFF5F7',
          100: '#FFE6EC',
          200: '#FDDDE6',
          300: '#FBB6CE',
          400: '#F687B3',
          500: '#ED64A6',
          DEFAULT: '#FDDDE6',
        },
        rose: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F472B6',
          600: '#E11D48',
          DEFAULT: '#F472B6',
        },
        lavender: {
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C4B5FD',
          DEFAULT: '#C4B5FD',
        },
        cream: {
          50: '#FFFCF8',
          100: '#FFF8F0',
          200: '#FEF0E0',
          DEFAULT: '#FFF8F0',
        },
        peach: {
          100: '#FFEBD9',
          200: '#FFD6B3',
          300: '#FFCBA4',
          DEFAULT: '#FFCBA4',
        },
        plum: {
          500: '#9D4B7A',
          600: '#7C3A5E',
          700: '#5C2243',
          800: '#3D122A',
          DEFAULT: '#7C3A5E',
        },
        gold: {
          300: '#F9E2AF',
          400: '#E7C37A',
          500: '#D4A853',
          DEFAULT: '#D4A853',
        },
        roseGold: {
          DEFAULT: '#C9796A',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Playfair Display', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-dm-sans)', 'Inter', 'sans-serif'],
        hand: ['var(--font-caveat)', 'Dancing Script', 'cursive'],
      },
      borderRadius: {
        'card': '24px',
        'card-lg': '32px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(225, 29, 72, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'ambient': '0 20px 40px -15px rgba(157, 75, 122, 0.12)',
        'glow-rose': '0 0 25px rgba(244, 114, 182, 0.45)',
        'glow-gold': '0 0 25px rgba(212, 168, 83, 0.4)',
        'glass': '0 8px 32px 0 rgba(196, 181, 253, 0.15)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-drift': 'floatDrift 12s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'aurora': 'auroraDrift 20s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatDrift: {
          '0%, 100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '33%': { transform: 'translate(10px, -15px) rotate(2deg)' },
          '66%': { transform: 'translate(-8px, -8px) rotate(-1deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        auroraDrift: {
          '0%': { transform: 'translate(0%, 0%) scale(1)' },
          '50%': { transform: 'translate(5%, -5%) scale(1.08)' },
          '100%': { transform: 'translate(-5%, 4%) scale(0.96)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
