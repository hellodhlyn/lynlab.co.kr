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
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
