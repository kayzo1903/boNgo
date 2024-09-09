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
        "homeimage": "url('/images/homegame.png')",
        "secongimage" : "url('/images/secondimage.png')",
        "third" : "url('/images/thirdimage.jpg')"
      },
    },
  },
  plugins: [],
};
export default config;
