import type { Config } from "tailwindcss";

import { fontFamily } from "tailwindcss/defaultTheme";

function withOpacity(variableName : any) {
  return ({ opacityValue } : any) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[class="dark-mode"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          900: withOpacity("--color-primary-900")({ opacityValue: 1 }),
          800: withOpacity("--color-primary-800")({ opacityValue: 1 }),
          700: withOpacity("--color-primary-700")({ opacityValue: 1 }),
          600: withOpacity("--color-primary-600")({ opacityValue: 1 }),
          500: withOpacity("--color-primary-500")({ opacityValue: 1 }),
          400: withOpacity("--color-primary-400")({ opacityValue: 1 }),
          300: withOpacity("--color-primary-300")({ opacityValue: 1 }),
          200: withOpacity("--color-primary-200")({ opacityValue: 1 }),
          100: withOpacity("--color-primary-100")({ opacityValue: 1 }),
        },
        secondary: {
          900: withOpacity("--color-secondary-900")({ opacityValue: 1 }),
          800: withOpacity("--color-secondary-800")({ opacityValue: 1 }),
          700: withOpacity("--color-secondary-700")({ opacityValue: 1 }),
          600: withOpacity("--color-secondary-600")({ opacityValue: 1 }),
          500: withOpacity("--color-secondary-500")({ opacityValue: 1 }),
          400: withOpacity("--color-secondary-400")({ opacityValue: 1 }),
          300: withOpacity("--color-secondary-300")({ opacityValue: 1 }),
          200: withOpacity("--color-secondary-200")({ opacityValue: 1 }),
          100: withOpacity("--color-secondary-100")({ opacityValue: 1 }),
          50: withOpacity("--color-secondary-50")({ opacityValue: 1 }),
          0: withOpacity("--color-secondary-0")({ opacityValue: 1 }),
        },
        success: withOpacity("--color-success")({ opacityValue: 1 }),
        warning: withOpacity("--color-warning")({ opacityValue: 1 }),
        error: withOpacity("--color-error")({ opacityValue: 1 }),
      },
      // by using the default tailwind container,we don't have to use mx-auto and padding anymore
      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: {
        // based on Next.js font tutorial :
        sans: ["var(--font-vazir)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
  ],
};
export default config;
