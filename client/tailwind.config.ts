import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#f7f6ee",
          100: "#eeecdd",
          200: "#ded9ba",
          300: "#cdc698",
          400: "#bdb375",
          500: "#aca053",
          600: "#8a8042",
          700: "#676032",
          800: "#454021",
          900: "#222011",
          950: "#18160c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
