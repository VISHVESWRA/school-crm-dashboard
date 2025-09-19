/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          light: "#FCDDEC",
          extraLight: "#FFF5FA",
          primary: "#C72571",
          dark: "#8B0F4B",
        },
      },
    },
  },
  plugins: [],
};
