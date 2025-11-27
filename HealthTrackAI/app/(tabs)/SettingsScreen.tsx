import React, { useState, createContext, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ThemeContext = createContext();

const light = {
  background: "#F7F7F7",
  card: "#FFFFFF",
  text: "#1A1A1A",
  subtext: "#777",
  divider: "#E0E0E0",
  accent: "#007AFF",
  danger: "#D64545",
};

const dark = {
  background: "#121212",
  card: "#1E1E1E",
  text: "#FFFFFF",
  subtext: "#A8A8A8",
  divider: "#333",
  accent: "#0A84FF",
  danger: "#FF6B6B",
};

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        theme: isDark ? dark : light,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}
