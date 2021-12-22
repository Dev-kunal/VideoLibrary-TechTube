module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primaryColor)",
        "bg-color": "var(--bgColor)",
        "border-col": "var(--boderColor)",
        "navbar-color": "var(--bgNavbar)",

      },
    },
  },
  plugins: [],
}
