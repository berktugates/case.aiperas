/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          glow: "rgb(var(--accent-glow) / <alpha-value>)",
        },
        message: {
          user: "rgb(var(--message-user) / <alpha-value>)",
          ai: "rgb(var(--message-ai) / <alpha-value>)",
        },
        glass: {
          bg: "rgb(var(--glass-bg) / <alpha-value>)",
          border: "rgb(var(--glass-border) / <alpha-value>)",
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'apple-glow': 'appleGlow 4s ease-in-out infinite',
        'apple-glow-delayed': 'appleGlow 4s ease-in-out infinite 2s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        appleGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1.0)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
