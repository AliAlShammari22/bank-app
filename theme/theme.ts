// app/theme.ts
import { ColorSchemeName, useColorScheme } from "react-native";

// 1) Alternative “beautiful” palettes for light and dark modes:
export const LightTheme = {
  background: "#FFFBF5", // warm ivory
  cardBackground: "#FFFFFF", // crisp white
  textPrimary: "#2C2C2C", // almost black
  textSecondary: "#6D6D6D", // softer charcoal
  border: "#E2D8C3", // pale beige
  accent: "#E67E22", // sunset orange
  placeholder: "#A9A9A9", // medium gray
  inputBackground: "#F7F3EF", // very light peach
  // …any other semantic names
};

export const DarkTheme = {
  background: "#1B1F24", // charcoal-black
  cardBackground: "#2A2E33", // slate-black
  textPrimary: "#F5F5F5", // near-white
  textSecondary: "#A0A0A0", // light gray
  border: "#3A3E43", // dark gray
  accent: "#D35400", // deep pumpkin
  placeholder: "#7F8C8D", // muted gray-blue
  inputBackground: "#33383E", // dark slate
  // …mirror every key in LightTheme
};

// 2) Helper to pick the right palette based on device setting
export function useTheme(): typeof LightTheme {
  const scheme: ColorSchemeName = useColorScheme(); // “light” or “dark”
  return scheme === "dark" ? DarkTheme : LightTheme;
}
