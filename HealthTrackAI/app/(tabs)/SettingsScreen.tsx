import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

function SectionTitle({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
      {children}
    </Text>
  );
}

function SettingsItem({ icon, label, value, onPress, right }: any) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.item, { borderColor: theme.border }]}
    >
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={22} color={theme.text} />
        <Text style={[styles.itemLabel, { color: theme.text }]}>{label}</Text>
      </View>

      {right ? (
        right
      ) : value ? (
        <Text style={[styles.itemValue, { color: theme.textSecondary }]}>
          {value}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
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
                trackColor={{ true: theme.primary, false: "#E9E9EA" }}
                thumbColor="#FFFFFF"
              />
            }
          />

          <SettingsItem
            icon="notifications-outline"
            label="Notificações"
            onPress={() => {}}
            right={
              <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
            }
          />

          <SettingsItem
            icon="document-text-outline"
            label="Unidades"
            onPress={() => {}}
            right={
              <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
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
              <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
            }
          />

          <SettingsItem
            icon="water-outline"
            label="Meta de Água"
            value="2.5L"
            onPress={() => {}}
            right={
              <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
            }
          />
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <SectionTitle>DADOS</SectionTitle>

          <SettingsItem
            icon="download-outline"
            label="Exportar Histórico"
            onPress={() => console.log("Exportar dados...")}
            right={<Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />}
          />

          <SettingsItem
            icon="trash-outline"
            label="Resetar Dados"
            onPress={() => console.log("Resetar dados...")}
            right={<Ionicons name="alert-circle-outline" size={20} color="#EF4444" />}
          />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 18,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 8,
    opacity: 0.8,
    letterSpacing: 0.5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemLabel: {
    marginLeft: 12,
    fontSize: 16,
  },
  itemValue: {
    fontSize: 16,
  },
});