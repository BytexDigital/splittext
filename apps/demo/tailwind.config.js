const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "sand-1": 'var(--sand-1)',
        "sand-2": 'var(--sand-2)',
        "sand-3": 'var(--sand-3)',
        "sand-4": 'var(--sand-4)',
        "sand-5": 'var(--sand-5)',
        "sand-6": 'var(--sand-6)',
        "sand-7": 'var(--sand-7)',
        "sand-8": 'var(--sand-8)',
        "sand-9": 'var(--sand-9)',
        "sand-10": 'var(--sand-10)',
        "sand-11": 'var(--sand-11)',
        "sand-12": 'var(--sand-12)',
      }
    },
  },
  plugins: [nextui()],
}

