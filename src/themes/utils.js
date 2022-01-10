export function getThemes() {
  return [
    createTheme({
      name: "Default",
      primary: "#f3f4f6",
      primaryLight: "#ffffff",
      secondary: "#3b82f6",
      textBase: "#374151",
      textLight: "#9ca3af",
      textLightest: "#9ca3af",
      textUltraLight: "#e5e7eb",
      warning: "#ee4444",
      success: "#34d399",
      successLight: "#dcfce7",
    }),
    createTheme({
      name: "MonkeyLog",
      primary: "#2d2f31",
      primaryLight: "#343639",
      secondary: "#e2b714",
      textBase: "#d1d0c5",
      textLight: "#646669",
      textLightest: "#646669",
      textUltraLight: "#646669",
      warning: "#ee4444",
      success: "#21c460",
      successLight: "#156433",
    }),
    createTheme({
      name: "Hacker",
      primary: "#000000",
      primaryLight: "#001818",
      secondary: "#15ff00",
      textBase: "#adffa7",
      textLight: "#206b20",
      textLightest: "#104b10",
      textUltraLight: "#001d00",
      warning: "#ee4444",
      success: "#003b00",
      successLight: "#001d00",
    }),
    createTheme({
      name: "80s after dark",
      primary: "#181a31",
      primaryLight: "#2b2d46",
      secondary: "#fca6d1",
      textBase: "#99d6ea",
      textLight: "#5a7a90",
      textLightest: "#5a7a90",
      textUltraLight: "#5a7a90",
      warning: "#fffb85",
      success: "#1b5d36",
      successLight: "#1b2d36",
    }),
  ];
}

export function applyTheme(theme) {
  const root = document.documentElement;
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, theme[cssVar]);
  });
}

export function createTheme({
  name,
  primary,
  primaryLight,
  secondary,
  textBase,
  textLight,
  textLightest,
  textUltraLight,
  warning,
  success,
  successLight,
}) {
  return {
    name: name,
    theme: {
      "--theme-primary": primary,
      "--theme-primary-light": primaryLight,
      "--theme-secondary": secondary,
      "--theme-text-base": textBase,
      "--theme-text-light": textLight,
      "--theme-text-lightest": textLightest,
      "--theme-text-ultra-light": textUltraLight,
      "--theme-warning": warning,
      "--theme-success": success,
      "--theme-success-light": successLight,
    },
  };
}
