/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-gold': {
          50: '#FFFAF0',
          100: '#FFEFD1',
          200: '#FFE4A3',
          300: '#FFD875',
          400: '#FFCD47',
          500: '#DAA520',
          600: '#B8860B',
          700: '#956B00',
          800: '#735100',
          900: '#513700'
        },
        'burgundy': {
          50: '#FDF2F4',
          100: '#FAE5E9',
          200: '#F5CCD3',
          300: '#EFB3BE',
          400: '#E99AA8',
          500: '#800020',
          600: '#66001A',
          700: '#4D0013',
          800: '#33000D',
          900: '#1A0006'
        },
        
        'primary': {
          50: '#FBF7F4',
          100: '#F6EBE4',
          200: '#EDD7C9',
          300: '#E4C3AE',
          400: '#DBAF93',
          500: '#CD9B78',
          600: '#B47B52',
          700: '#8B5E3D',
          800: '#624129',
          900: '#392414'
        },
        'wheat': {
          50: '#FFFDF7',
          100: '#FFF8E7',
          200: '#FFF1CF',
          300: '#FFE9B7',
          400: '#FFE19F',
          500: '#F5DEB3',
          600: '#D4BE93',
          700: '#B39E73',
          800: '#927E53',
          900: '#715E33'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};