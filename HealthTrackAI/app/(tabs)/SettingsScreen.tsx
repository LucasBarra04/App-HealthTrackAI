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


function SectionTitle({ children }) {
  const { theme } = useTheme();
  return (
    <Text style={[styles.sectionTitle, { color: theme.subtext }]}>
      {children}
    </Text>
  );
}

function SettingsItem({ icon, label, value, onPress, right }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.item, { borderColor: theme.divider }]}
    >
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={22} color={theme.text} />
        <Text style={[styles.itemLabel, { color: theme.text }]}>{label}</Text>
      </View>

      {right ? (
        right
      ) : value ? (
        <Text style={[styles.itemValue, { color: theme.subtext }]}>
          {value}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}
