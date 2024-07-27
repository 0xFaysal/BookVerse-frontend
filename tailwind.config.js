/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
                raleway: ["Raleway", "sans-serif"],
                "cormorant-garamond": ["Cormorant Garamond", "serif"],
            },
        },
    },
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                    primary: "#20B970", // Navbar background
                    "primary-content": "#ffffff",
                    secondary: "#FF7B38",
                    "secondary-content": "#000",
                    accent: "#473080",
                    "accent-content": "#ffffff",
                    neutral: "#222831",
                    "neutral-content": "#ffffff",
                    "base-100": "#ffffff", // Full body background
                    "base-200": "#c9e0d5", // Footer background
                    "base-content": "#060620",
                    error: "#FF3860",
                    "error-content": "#ffffff",
                },
                dark: {
                    ...require("daisyui/src/theming/themes")["dark"],
                    primary: "#008170", // Navbar background
                    "primary-content": "#ffffff",
                    secondary: "#005B41",
                    "secondary-content": "#ffffff",
                    accent: "#FEDE3A",
                    "accent-content": "#000",
                    neutral: "#222831",
                    "neutral-content": "#ffffff",
                    "base-100": "#0F0F0F", // Full body background
                    "base-200": "#102317", // Footer background
                    "base-content": "#fff",
                    error: "#FF3860",
                    "error-content": "#ffffff",
                },
            },
        ],
    },

    plugins: [require("daisyui")],
};
