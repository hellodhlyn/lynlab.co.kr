import type { Config } from "tailwindcss";

export default {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extends: {
      fontFamily: {
        sans: [
          "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "\"Helvetica Neue\"",
          "\"Segoe UI\"", "\"Apple SD Gothic Neo\"", "\"Noto Sans KR\"", "\"Malgun Gothic\"", "sans-serif",
        ],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
