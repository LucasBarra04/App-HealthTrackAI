import React, { createContext, useState } from "react";
import { Appearance } from "react-native";

const LightTheme = {
  background: "#FFFFFF",
  text: "#000000",
  subtext: "#555555",
  card: "#F2F2F2",
};

const DarkTheme = {
  background: "#000000",
  text: "#FFFFFF",
  subtext: "#BBBBBB",
  card: "#1C1C1E",
};

const ThemeContext = createContext({
  theme: LightTheme,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const color = Appearance.getColorScheme();

  const [theme, setTheme] = useState(
    color === "dark" ? DarkTheme : LightTheme
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === LightTheme ? DarkTheme : LightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);
