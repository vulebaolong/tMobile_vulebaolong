/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    // content: ["./index.html"],
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
