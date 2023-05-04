/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter var"],
            },
            width: {
                "5%": "5%",
            },
        },
    },
    plugins: [],
};
