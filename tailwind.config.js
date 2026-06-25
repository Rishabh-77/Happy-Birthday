/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "birthday-pink": {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
        },
      },
      maxWidth: {
        "hp-victus": "1800px", // HP Victus 16" optimization
      },
      screens: {
        "hp-victus": "1920px", // HP Victus 16" screen width (16:9 aspect ratio)
      },
      aspectRatio: {
        "hp-victus": "16/9", // HP Victus 16" aspect ratio
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        "cloud-slow": "cloud-drift 30s linear infinite",
        "cloud-medium": "cloud-drift 20s linear infinite",
        "cloud-fast": "cloud-drift 15s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "cloud-drift": {
          "0%": { transform: "translateX(100vw)" },
          "100%": { transform: "translateX(-200px)" },
        },
      },
    },
  },
  plugins: [],
};
