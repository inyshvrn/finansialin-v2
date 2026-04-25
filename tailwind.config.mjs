/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'fin-bg': '#FAF7F2',       // Cream
        'fin-black': '#1A1A1A',    // Charcoal
        'fin-gold': '#C5A059',     // Gold
        'fin-taupe': '#7A746E',    // Grey Text
        'fin-border': '#E8E2D9',   // Border Color
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};