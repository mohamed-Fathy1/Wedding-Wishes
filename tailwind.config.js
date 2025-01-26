import { type Config } from "tailwindcss"

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'dancing': ['Dancing Script', 'cursive'], // Ensure this is included
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      colors: {
        border: {
          DEFAULT: "hsl(var(--border))",
        },
        gold: {
          light: '#ddc5a0',
          DEFAULT: '#d4af37',
          dark: '#b28e1c',
        },
        roseGold: {
          50: '#fff9f9',
          100: '#ffeef0',
          200: '#ffd4d9',
          300: '#ffb3bc',
          400: '#fb8c98',
          500: '#f26d7d',
          600: '#e14e60',
          700: '#b83848',
          800: '#962c3a',
          900: '#7a2530',
        },
        cream: '#fdf6f0',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'dancing': ['Dancing Script', 'cursive'],
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'floral-corner': `url(${process.env.NEXT_PUBLIC_FLORAL_CORNER_URL || 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-24%20at%2017.36.18_b2c29e66.jpg-IhtoMCvrgxGSQznrkwhJYrCCHgH0An.jpeg'})`,
      },
    },
  },
  plugins: [],
} satisfies Config

