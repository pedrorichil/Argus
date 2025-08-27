/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-cyan': 'rgb(34, 211, 238)',
        'theme-purple': 'rgb(192, 132, 252)',
        'theme-amber': 'rgb(251, 191, 36)',
        'theme-green': 'rgb(74, 222, 128)',
        'theme-orange': 'rgb(251, 146, 60)',
        'theme-bg': '#111827',
        'theme-card': '#1f2937',
        'theme-text': '#e5e7eb',
        'theme-text-muted': '#9ca3af',
        'theme-border': 'rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}