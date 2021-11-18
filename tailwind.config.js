module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        smallpress: {
          "0%, 50%": { transform: "scale(0.95)" },
          "50%, 100%": { transform: "scale(1)" },
        },
      },
      animation: {
        press: "smallpress 500ms ease-in-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
