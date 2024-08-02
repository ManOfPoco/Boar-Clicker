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
            boxShadow: {
                glow: "0 -20px 20px rgba(243, 186, 47, 0.3), 0 20px 20px rgba(243, 186, 47, 0.3), 20px 0 20px rgba(243, 186, 47, 0.3), -20px 0 20px rgba(243, 186, 47, 0.3)",
            },
            keyframes: {
                "fade-in": {
                    "0%": {
                        opacity: "0",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
                "fade-out": {
                    "0%": {
                        opacity: "1",
                    },
                    "100%": {
                        opacity: "0",
                    },
                },
                slideIn: {
                    "100%": { transform: "translateY(-50%)" },
                },
                slideOut: {
                    "0%": { transform: "translateY(calc(-50% - 192px))" },
                    "100%": { transform: "translateY(0)" },
                },
            },
            animation: {
                "fade-in": "fade-in 0.5s ease-in-out",
                "fade-out": "fade-out 0.5s ease-in-out",
                slideIn: "slideIn 0.5s ease-out forwards",
                slideOut: "slideOut 0.5s ease-out forwards",
            },
        },
    },
    plugins: [],
};
