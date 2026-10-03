import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ngo: {
          orange: {
            DEFAULT: "#F57C00",
            50: "#FFF8E1",
            100: "#FFECB3",
            200: "#FFE082",
            300: "#FFD54F",
            400: "#FFB74D",
            500: "#F57C00",
            600: "#EF6C00",
            700: "#E65100",
            800: "#BF360C",
            900: "#871C04",
          },
          dark: {
            DEFAULT: "#2D2D2D",
            50: "#F7F7F7",
            100: "#E6E6E6",
            200: "#CCCCCC",
            300: "#999999",
            400: "#666666",
            500: "#4D4D4D",
            600: "#3D3D3D",
            700: "#2D2D2D",
            800: "#1F1F1F",
            900: "#121212",
          },
          saffron: "#FF6F00",
          cream: "#FAFAFA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-poppins)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        card: "0 10px 30px -4px rgba(45, 45, 45, 0.08)",
        glow: "0 0 25px rgba(245, 124, 0, 0.25)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
