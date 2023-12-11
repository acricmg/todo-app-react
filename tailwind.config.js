/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#407888",
        "primary-100": "#326878",
        "primary-200": "#265968",
        "primary-300": "#194653",
        secondary: "#5097AB",
        "secondary-100": "#398296",
        "secondary-200": "#276A7C",
        "secondary-300": "#184957",
        success: "#548840,",
      },
    },
  },
  plugins: [],
};
