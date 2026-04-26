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
        'fin-bg': '#FAF7F2',
        'fin-black': '#1A1A1A',
        'fin-gold': '#C5A059',
        'fin-taupe': '#7A746E',
        'fin-border': '#E8E2D9',
      },
      fontFamily: {
        sans: ["var(--font-inclusive)", "Inter", "ui-sans-serif", "system-ui"],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
