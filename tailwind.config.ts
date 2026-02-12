
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
        background: "var(--background)",
        foreground: "var(--foreground)",
        canvas: "var(--canvas)",
        panel: "var(--panel)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        "light-authentic": "cubic-bezier(0.23, 1, 0.32, 1)", // easeOutQuint
        "dark-cinematic": "cubic-bezier(0.87, 0, 0.13, 1)", // easeInOutExpo
      },
      spacing: {
        "100vh": "100vh",
        "200vh": "200vh",
      },
    },
  },
  plugins: [],
};
export default config;
