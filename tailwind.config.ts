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
        "accent-black": "#18181b",
        "accent-gray-100": "#f4f4f5",
        "accent-gray-200": "#e4e4e7",
        "accent-gray-300": "#71717a",
        "accent-green-100": "#14a800",
      },
    },
  },
  plugins: [],
};
export default config;
