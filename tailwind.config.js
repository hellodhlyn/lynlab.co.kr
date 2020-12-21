/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['"Spoqa Han Sans Neo"', 'sans-serif'],
    },
    extend: {
      colors: {
        // Source: https://yeun.github.io/open-color/
        gray: {
          '000': '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        blue: {
          '000': '#e7f5ff',
          100: '#d0ebff',
          200: '#a5d8ff',
          300: '#74c0fc',
          400: '#4dabf7',
          500: '#339af0',
          600: '#228be6',
          700: '#1c7ed6',
          800: '#1971c2',
          900: '#1864ab',
        },
        red: {
          '000': '#fff5f5',
          100: '#ffe3e3',
          200: '#ffc9c9',
          300: '#ffa8a8',
          400: '#ff8787',
          500: '#ff6b6b',
          600: '#fa5252',
          700: '#f03e3e',
          800: '#e03131',
          900: '#c92a2a',
        },
        orange: {
          '000': '#fff4e6',
          100: '#ffe8cc',
          200: '#ffd8a8',
          300: '#ffc078',
          400: '#ffa94d',
          500: '#ff922b',
          600: '#fd7e14',
          700: '#f76707',
          800: '#e8590c',
          900: '#d9480f',
        },
      },
      height: {
        'screen-30': '30vh',
        'screen-50': '50vh',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            img: {
              margin: '0 auto',
            },
          },
        },
        md: {
          css: {
            img: {
              'max-height': '30vh',
              'max-width': '720px',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: { color: theme('colors.gray.100') },
            strong: { color: theme('colors.gray.100') },
            h1: { color: theme('colors.gray.100') },
            h2: { color: theme('colors.gray.100') },
            h3: { color: theme('colors.gray.100') },
            h4: { color: theme('colors.gray.100') },
            code: { color: theme('colors.gray.300') },
            blockquote: { color: theme('colors.gray.600') },
            img: {
              'max-height': '30vh',
              'max-width': '720px',
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
      verticalAlign: ['before'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-line-clamp'),
    require('tailwindcss-pseudo-elements'),
  ],
};
