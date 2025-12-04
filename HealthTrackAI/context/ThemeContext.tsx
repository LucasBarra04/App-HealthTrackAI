import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const lightTheme = {
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  primary: "#6366F1",
  success: "#10B981",
  error: '#EF4444',
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
  error: '#EF4444',
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
const THEME_STORAGE_KEY = "@meuapp_theme_pref";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadThemePref();
  }, []);

  const loadThemePref = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDark(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.log("Erro ao carregar tema:", error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newState = !isDark;
      setIsDark(newState);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newState));
    } catch (error) {
      console.log("Erro ao salvar tema:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme: isDark ? darkTheme : lightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}