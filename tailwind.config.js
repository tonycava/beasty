/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      keyframes: {
        scaleZeroToOne: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        scaleOneToZero: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' }
        },
        dotFadeOut: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(24px, 0)' }
        }
      },
      animation: {
        scaleZeroToOne: 'scaleZeroToOne 0.6s infinite',
        scaleOneToZero: 'scaleOneToZero 0.6s infinite',
        dotFadeOut: 'dotFadeOut 0.6s infinite'
      },
      colors: {
        primary: {
          DEFAULT: '#FFDB78',
          light: '#FFE6A5',
          dark: '#CCB15E'
        },
        secondary: {
          DEFAULT: '#FF9F63',
          light: '#FFB789',
          dark: '#CC7F50'
        },
        accent: {
          DEFAULT: '#3B7080',
          light: '#6692A3',
          dark: '#2C5562'
        }
      },
      fontFamily: {
        'space-mono': ['Space Mono', 'monospace'],
        'dm-sans': ['DM Sans', 'Helvetica', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
      }
    }
  },
  plugins: [
    // eslint-disable-next-line
    require('@tailwindcss/typography')
  ]
};
