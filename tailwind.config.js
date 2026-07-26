/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lemon: "#ADFF2F",     // navbar background
        darkBlue: "#0A1F44",  // fonts
        darkGreen: "#064E3B", // sections
      },
    },
  },
  plugins: [],
}