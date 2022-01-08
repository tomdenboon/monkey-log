export function getThemes() {
  return [
    createTheme({
      name: "Default",
      primary: "#f3f4f6",
      primaryLight: "#ffffff",
      secondary: "#3b82f6",
      textBase: "#374151",
      textLight: "#737a87",
      textLightest: "#9ca3af",
      warning: "#ee4444",
      success: "#34d399",
      successLight: "#dcfce7",
    }),
    createTheme({
      name: "MonkeyLog",
      primary: "#2d2f31",
      primaryLight: "#323437",
      secondary: "#e2b714",
      textBase: "#d1d0c5",
      textLight: "#646669",
      textLightest: "#646669",
      warning: "#ee4444",
      success: "#21c460",
      successLight: "#156433",
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
      "--theme-warning": warning,
      "--theme-success": success,
      "--theme-success-light": successLight,
    },
  };
}
