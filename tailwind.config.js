module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundSize: {
        "200%": "200%",
      },
      backgroundImage: {
        "split-white-green":
          "linear-gradient(to left, #DCFCE7 50% , white 50%);",
      },
      boxShadow: {
        header: "0px 0px 1.5px 3px rgba(0,0,0,0.3)",
      },
      keyframes: {
        smallpress: {
          "0%, 50%": { transform: "scale(0.90)" },
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
