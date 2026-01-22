// tailwind.config.js
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#32CD32", // Neon Green
                secondary: "#1E293B", // Dark Slate
                accent: "#00BFFF", // Electric Blue
            },
        },
    },
    plugins: [],
};
