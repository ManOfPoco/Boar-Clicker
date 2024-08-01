/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            xs: "376px",
        },
        extend: {
            colors: {
                primary: "#FF4C00",
                "dark-grey": "#0d1117",
                "rich-black": "#010409",
            },
            backgroundImage: {
                "navigation-background":
                    "linear-gradient(to bottom, rgba(255, 76, 0, 0.31) 0%, rgba(1, 4, 9, 0.31) 100%)",
            },
            height: {
                "6/10": "60%",
            },
            inset: {
                "2/5": "40%",
            },
            translate: {
                "2/5": "40%",
            },
        },
    },
    plugins: [],
};
