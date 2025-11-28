import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";

import { LineChart } from "react-native-gifted-charts";
import { MetricCard } from "../../components/MetricCard";
import { useTheme } from "../../hooks/useTheme";

const SIMPLE_WEEK = [
  { id: 1, type: "Ingestão de Água", date: "2025-02-10", amount: 500 },
  { id: 2, type: "Sono", date: "2025-02-09", hours: 7 },
  { id: 3, type: "Ingestão de Água", date: "2025-02-08", amount: 800 },
  { id: 4, type: "Sono", date: "2025-02-07", hours: 6 },
  { id: 5, type: "Ingestão de Água", date: "2025-02-06", amount: 1000 },
  { id: 6, type: "Sono", date: "2025-02-05", hours: 8 },
  { id: 7, type: "Ingestão de Água", date: "2025-02-04", amount: 1200 },
];

const SIMPLE_MONTH = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 20,
  type: i % 2 === 0 ? "Ingestão de Água" : "Sono",
  date: `2025-01-${String(30 - i).padStart(2, "0")}`,
  amount: i % 2 === 0 ? 800 + i * 5 : undefined,
  hours: i % 2 !== 0 ? 6 + (i % 3) : undefined,
}));

const SIMPLE_YEAR = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 100,
  type: i % 2 === 0 ? "Ingestão de Água" : "Sono",
  date: `2024-${String(i + 1).padStart(2, "0")}-15`,
  amount: i % 2 === 0 ? 900 + i * 20 : undefined,
  hours: i % 2 !== 0 ? 5 + (i % 4) : undefined,
}));

export default function HistoricoScreen() {
  const { theme } = useTheme();

  const [filtered, setFiltered] = useState<[]>([]);
  const [filter, setFilter] = useState<"week" | "month" | "year">("week");

  useEffect(() => {
    updateFilter("week");
  }, []);

  const updateFilter = (type: "week" | "month" | "year") => {
    setFilter(type);

    if (type === "week") {
      setFiltered(SIMPLE_WEEK);
    } else if (type === "month") {
      setFiltered(SIMPLE_MONTH);
    } else {
      setFiltered(SIMPLE_YEAR);
    }
  };

  const chartData = filtered.map((item) => ({
    value: item.amount
      ? item.amount
      : item.hours
      ? item.hours * 100
      : 0,
    label: item.date.substring(5, 10),
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.text }]}>Histórico</Text>

        <View style={styles.filterContainer}>
          {["week", "month", "year"].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => updateFilter(t as any)}
              style={[
                styles.filterButton,
                filter === t && {
                  backgroundColor: theme.card,
                  borderColor: theme.text,
                },
              ]}
            >
              <Text style={[styles.filterText, { color: theme.text }]}>
                {t === "week" ? "Semana" : t === "month" ? "Mês" : "Ano"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.chartContainer}>
          {chartData.length > 0 ? (
            <LineChart
              data={chartData}
              curved
              thickness={3}
              color={theme.text}
              hideDataPoints={false}
              dataPointsColor={theme.text}
              startFillColor={theme.card}
              endFillColor={theme.card}
              areaChart
              noOfSections={3}
              yAxisTextStyle={{ color: theme.subtext }}
              xAxisTextStyle={{ color: theme.subtext }}
              backgroundColor={theme.card}
              rulesColor={theme.subtext}
              width={Dimensions.get("window").width - 36}
            />
          ) : (
            <Text style={{ textAlign: "center", color: theme.subtext }}>
              Sem dados.
            </Text>
          )}
        </View>

        <View style={styles.cardGrid}>
          {filtered.map((item) => {
            const value = item.amount
              ? `${item.amount} ml`
              : item.hours
              ? `${item.hours} h`
              : "—";

            return (
              <MetricCard
                key={item.id}
                title={item.type}
                value={value}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  chartContainer: { marginBottom: 24, borderRadius: 16 },
  filterContainer: { flexDirection: "row", gap: 8, marginBottom: 16 },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  filterText: { fontSize: 14, fontWeight: "600" },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
});
