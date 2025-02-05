import type { Config } from "tailwindcss";
import { heroui, ConfigTheme } from "@heroui/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            "code-background": "#363449",
            "code-mdx": "#ff4ecd",
          },
        } as ConfigTheme,
        dark: {
          colors: {
            "code-background": "#0D0B0B",
            "code-mdx": "#06B7DB",
          },
        } as ConfigTheme,
      },
    }),
  ],
} satisfies Config;
