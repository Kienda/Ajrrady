/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ajPurple: "#6A0DAD",
        ajGreen: "#16A34A",
        ajLight: "#F8F8FC",
        ajDark: "#1F2937",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(31, 41, 55, 0.10)",
      },
    },
  },
  plugins: [],
};
