/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        fontFamily: {
            sans: ["Rubik", "sans-serif"],
        },
        extend: {
            colors: {
                white: {
                    300: "#F1F5F9",
                    400: "#E8ECF0",
                },
                blue: {
                    300: "#178FD4",
                    400: "#1686C7",
                },
                "dark-blue": {
                    300: "#242B37",
                    400: "#191F28",
                },
            },
        },
    },
    plugins: [],
};
