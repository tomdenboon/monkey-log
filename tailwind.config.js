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
        "split-primary-light-success":
          "linear-gradient(to left, var(--theme-primary-light) 50%, var(--theme-success-light) 50% );",
      },
      boxShadow: {
        header: "0px 0px 2px 2px rgba(0,0,0,0.2)",
        footer: "0px 0px 2px 1.5px rgba(0,0,0,0.2)",
      },
      colors: {
        primary: "var(--theme-primary)",
        "primary-light": "var(--theme-primary-light)",
        secondary: "var(--theme-secondary)",
        "text-base": "var(--theme-text-base)",
        "text-light": "var(--theme-text-light)",
        "text-lightest": "var(--theme-text-lightest)",
        warning: "var(--theme-warning)",
        success: "var(--theme-success)",
        "success-light": "var(--theme-success-light)",
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
