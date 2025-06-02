// app/ThemeProvider.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { DarkTheme, LightTheme } from "./theme";

type Theme = typeof LightTheme;
type ThemeMode = ColorSchemeName | "light" | "dark";

// 1) Create a context
const ThemeContext = createContext<{
  theme: Theme;
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
}>({
  theme: LightTheme,
  mode: Appearance.getColorScheme(), // initial
  setMode: () => {},
});

// 2) Provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = Appearance.getColorScheme() || "light";
  const [mode, setMode] = useState<ThemeMode>(systemScheme);

  const theme = mode === "dark" ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3) Custom hook to consume
export function useThemeContext() {
  return useContext(ThemeContext);
}
