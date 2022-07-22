/* eslint-disable import/no-extraneous-dependencies */
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "\"Helvetica Neue\"",
        "\"Segoe UI\"", "\"Apple SD Gothic Neo\"", "\"Noto Sans KR\"", "\"Malgun Gothic\"", "sans-serif",
      ],
    },
    extend: {
      colors: {
        gray: colors.neutral,
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: { color: theme("colors.gray.100") },
            strong: { color: theme("colors.gray.100") },
            h1: { color: theme("colors.gray.100") },
            h2: { color: theme("colors.gray.100") },
            h3: { color: theme("colors.gray.100") },
            h4: { color: theme("colors.gray.100") },
            code: { color: theme("colors.gray.300") },
            blockquote: { color: theme("colors.gray.600") },
            pre: { backgroundColor: theme("colors.gray.900") },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
