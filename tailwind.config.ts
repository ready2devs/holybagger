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
        background: "var(--bg-primary)",
        card: "var(--bg-card)",
        hover: "var(--bg-hover)",
        border: "var(--border)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "accent-green": "var(--accent-green)",
        "accent-emerald": "var(--accent-emerald)",
        "accent-red": "var(--accent-red)",
        "accent-amber": "var(--accent-amber)",
        "accent-blue": "var(--accent-blue)",
      },
    },
  },
  plugins: [],
};
export default config;
