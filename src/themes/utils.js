import defaultTheme from "../themes/defaultTheme";
import stealthTheme from "../themes/stealthTheme";

export function getThemes() {
  return [defaultTheme, stealthTheme];
}

export function applyTheme(theme) {
  const root = document.documentElement;
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, theme[cssVar]);
  });
}

export function createTheme({
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
    "--theme-primary": primary,
    "--theme-primary-dark": primaryLight,
    "--theme-secondary": secondary,
    "--theme-text-base": textBase,
    "--theme-text-dark": textLight,
    "--theme-text-darkest": textLightest,
    "--theme-warning": warning,
    "--theme-success": success,
    "--theme-success-light": successLight,
  };
}
