/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    minWidth: {
      screen: "100vw",
    },
    minHeight: {
      screen: "100vh",
    },
  },
  plugins: [],
}
