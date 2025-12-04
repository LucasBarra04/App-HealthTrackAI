import React, { createContext, useContext, useState, ReactNode } from "react";

export const lightTheme = {
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  primary: "#6366F1",
  success: "#10B981",
  accent: "#F59E0B",
  navBackground: "#FFFFFF",
};

export const darkTheme = {
  background: "#121212",
  card: "#1E1E1E",
  text: "#FFFFFF",
  textSecondary: "#A8A8A8",
  border: "#333333",
  primary: "#818CF8",
  success: "#34D399",
  accent: "#FBBF24",
  navBackground: "#1E1E1E",
};

type ThemeType = typeof lightTheme;

interface ThemeContextData {
  isDark: boolean;
  toggleTheme: () => void;
  theme: ThemeType;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        theme: isDark ? darkTheme : lightTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}