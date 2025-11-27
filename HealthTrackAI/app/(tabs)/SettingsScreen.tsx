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


function SettingsScreen() {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <SectionTitle>PREFERÊNCIAS</SectionTitle>

          <SettingsItem
            icon="moon"
            label="Tema Escuro"
            right={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ true: theme.accent, false: "#999" }}
                thumbColor="#fff"
              />
            }
          />

          <SettingsItem
            icon="notifications-outline"
            label="Notificações"
            onPress={() => {}}
            right={
              <Ionicons name="chevron-forward" size={20} color={theme.subtext} />
            }
          />

          <SettingsItem
            icon="document-text-outline"
            label="Unidades"
            onPress={() => {}}
            right={
              <Ionicons name="chevron-forward" size={20} color={theme.subtext} />
            }
          />
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <SectionTitle>METAS</SectionTitle>

          <SettingsItem
            icon="bed-outline"
            label="Meta de Sono"
            value="8h"
            onPress={() => {}}
            right={
              <Ionicons name="chevron-forward" size={20} color={theme.subtext} />
            }
          />

          <SettingsItem
            icon="water-outline"
            label="Meta de Água"
            value="2.5L"
            onPress={() => {}}
            right={
              <Ionicons name="chevron-forward" size={20} color={theme.subtext} />
            }
          />
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <SectionTitle>DADOS</SectionTitle>

          <SettingsItem
            icon="download-outline"
            label="Exportar Histórico"
            onPress={() => {}}
          />

          <SettingsItem
            icon="trash-outline"
            label="Resetar Dados"
            onPress={() => {}}
            right={null}
          />
        </View>
      </ScrollView>
    </View>
  );
}
