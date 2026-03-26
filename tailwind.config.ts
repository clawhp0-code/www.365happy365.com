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
        "warm-bg": "#FAFAF8",
        "warm-surface": "#F5F0E8",
        "warm-border": "#E7E0D6",
        primary: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        category: {
          health: "#059669",
          food: "#EA580C",
          essay: "#7C3AED",
          exercise: "#0284C7",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "var(--font-noto-kr)",
          "Noto Sans KR",
          "Apple SD Gothic Neo",
          "-apple-system",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#1C1917",
            lineHeight: "1.95",
            fontSize: "1.0625rem",
            a: {
              color: "#D97706",
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": {
                color: "#B45309",
                textDecoration: "underline",
              },
            },
            "h1, h2, h3, h4": {
              color: "#1C1917",
              fontWeight: "700",
              letterSpacing: "-0.01em",
              wordBreak: "keep-all",
            },
            h2: {
              marginTop: "2.5rem",
              marginBottom: "1rem",
              paddingBottom: "0.5rem",
              borderBottom: "2px solid #F5F0E8",
            },
            p: {
              wordBreak: "keep-all",
              overflowWrap: "break-word",
            },
            li: {
              wordBreak: "keep-all",
            },
            blockquote: {
              borderLeftColor: "#F59E0B",
              borderLeftWidth: "4px",
              backgroundColor: "#FFFBEB",
              padding: "1rem 1.5rem",
              borderRadius: "0 0.75rem 0.75rem 0",
              fontStyle: "normal",
              quotes: "none",
              color: "#44403C",
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:last-of-type::after": { content: "none" },
            code: {
              backgroundColor: "#F5F5F4",
              color: "#292524",
              padding: "0.2em 0.5em",
              borderRadius: "0.25rem",
              fontWeight: "400",
              fontSize: "0.875em",
            },
            "pre code": {
              backgroundColor: "transparent",
              color: "inherit",
              padding: "0",
              fontSize: "inherit",
            },
            pre: {
              backgroundColor: "#1C1917",
              color: "#E7E5E4",
              borderRadius: "0.75rem",
            },
            img: {
              borderRadius: "0.75rem",
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            },
            hr: {
              borderColor: "#E7E0D6",
              marginTop: "2.5rem",
              marginBottom: "2.5rem",
            },
            strong: {
              color: "#1C1917",
              fontWeight: "700",
            },
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
