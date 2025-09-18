/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
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
