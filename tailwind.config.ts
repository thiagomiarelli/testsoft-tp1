import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#4285F4",
        primaryDark: "#2f6acb",
        secondary: "#DDE9FE",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif", "arial"],
        decorative: ["var(--font-lilita-one)"],
      },
    },
  },
  plugins: [],
};
export default config;
