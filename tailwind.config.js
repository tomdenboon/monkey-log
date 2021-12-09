module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        header: "0px 0px 1px 1.5px rgba(0,0,0,0.2)",
      },
      keyframes: {
        smallpress: {
          "0%, 50%": { transform: "scale(0.95)" },
          "50%, 100%": { transform: "scale(1)" },
        },
      },
      animation: {
        press: "smallpress 500ms ease-in-out",
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
