import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      gridTemplateColumns: {
        main: "300px 1fr",
        mainSm: "200px 1fr",
      },
      gridTemplateRows: {
        main: "fit-content(50px) fit-content(50px) minmax(auto,1fr)",
      },
    },
  },
  plugins: [],
} satisfies Config;
