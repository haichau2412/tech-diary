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
      keyframes: {
        "fade-out": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1.4)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-out": "fade-out 0.5s ease-in-out",
        "fade-in-zoom": "fade-in 0.5s ease-in-out",
      },

      gridTemplateColumns: {
        main: "300px 1fr",
        mainSm: "200px 1fr",
        utubeNote: "100%",
        utubeDashboard: "repeat(auto-fill, 250px)"
      },
      gridTemplateRows: {
        main: "fit-content(50px) fit-content(50px) minmax(auto,1fr)",
        utubeDashboard: "200px",
        utubeNote: "50% 25% 1fr"
      },
    },
  },
  plugins: [],
} satisfies Config;
