/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "media",
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)"

      },
    },
  },
  plugins: [],
}

