/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#407888",
        secondary: "#ADD8E6",
      },
      opacity: {
        16: "0.16",
      },
    },
    
  },
  plugins: [],
}

