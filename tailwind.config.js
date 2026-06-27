/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        ajPurple: "#6A0DAD",
        ajGreen: "#16A34A",
        ajLight: "#F8F8FC",
        ajDark: "#1F2937",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(31, 41, 55, 0.10)",
        card: "0 4px 24px rgba(31, 41, 55, 0.07)",
      },
      letterSpacing: {
        eyebrow: "0.14em",
      },
    },
  },
  plugins: [],
};
