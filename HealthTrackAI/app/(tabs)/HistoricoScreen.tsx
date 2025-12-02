import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { MetricCard } from "../../components/MetricCard";
import { useTheme } from "../../context/ThemeContext";
import { useData } from "../../context/DataContext";
import { Ionicons } from "@expo/vector-icons";

type MetricType = 'sono' | 'agua' | 'humor';
type TimeRange = '7d' | '30d' | '90d';

export default function HistoricoScreen() {
  const { theme } = useTheme();
  const { history } = useData();

  const [selectedMetric, setSelectedMetric] = useState<MetricType>('sono');
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  const getFilteredData = () => {
    const limit = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    return [...history]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
      .reverse();
  };

  const chartDataPoints = getFilteredData().map(item => {
    let val = 0;
    if (selectedMetric === 'sono') val = item.sleep;
    if (selectedMetric === 'agua') val = item.water;
    if (selectedMetric === 'humor') val = item.mood !== null ? item.mood + 1 : 0;
    
    return {
      value: val,
      label: item.date.split('-')[2],
      dataPointText: val.toString()
    };
  });

  const values = chartDataPoints.map(d => d.value);
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = values.length > 0 ? (sum / values.length).toFixed(1) : "0";
  
  const maxVal = Math.max(...values, 0);
  const bestDayIndex = values.indexOf(maxVal);
  const bestDayDate = bestDayIndex >= 0 ? getFilteredData()[bestDayIndex].date : '-';

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        <Text style={[styles.headerTitle, { color: theme.text }]}>Histórico</Text>

        <View style={styles.pillContainer}>
          {['7d', '30d', '90d'].map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setTimeRange(range as TimeRange)}
              style={[
                styles.pill,
                timeRange === range ? { backgroundColor: theme.primary } : { backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }
              ]}
            >
              <Text style={[styles.pillText, { color: timeRange === range ? '#FFF' : theme.text }]}>
                {range === '7d' ? '7 dias' : range === '30d' ? '30 dias' : '90 dias'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.tabsContainer, { backgroundColor: theme.card }]}>
          {(['sono', 'agua', 'humor'] as MetricType[]).map((metric) => (
            <TouchableOpacity
              key={metric}
              onPress={() => setSelectedMetric(metric)}
              style={[
                styles.tabItem,
                selectedMetric === metric && styles.activeTabItem,
                selectedMetric === metric && { borderBottomColor: theme.primary }
              ]}
            >
              <Text style={[
                styles.tabText, 
                { color: selectedMetric === metric ? theme.primary : theme.textSecondary }
              ]}>
                {metric.charAt(0).toUpperCase() + metric.slice(1).replace('g', 'g')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.chartWrapper, { backgroundColor: theme.card }]}>
          {chartDataPoints.length > 0 ? (
            <LineChart
              data={chartDataPoints}
              curved
              thickness={3}
              color={theme.primary}
              hideDataPoints={false}
              dataPointsColor={theme.primary}
              startFillColor={theme.primary}
              endFillColor={theme.background}
              startOpacity={0.2}
              endOpacity={0.0}
              areaChart
              rulesColor={theme.border}
              yAxisTextStyle={{ color: theme.textSecondary }}
              xAxisTextStyle={{ color: theme.textSecondary }}
              width={Dimensions.get("window").width - 64}
              height={180}
              spacing={40}
              initialSpacing={10}
            />
          ) : (
             <Text style={{color: theme.textSecondary, textAlign: 'center', padding: 20}}>Sem dados suficientes</Text>
          )}
        </View>

        <View style={styles.statsRow}>
          <MetricCard title="Média" value={`${avg} ${selectedMetric === 'agua' ? 'L' : selectedMetric === 'sono' ? 'h' : ''}`} />
          <MetricCard title="Melhor dia" value={bestDayDate.split('-').slice(1).join('/')} />
          <MetricCard title="Tendência" trend="up" value="" />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Entregas Recentes</Text>
        <View style={styles.recentList}>
          {getFilteredData().slice(0, 5).map((item, index) => (
            <View key={index} style={[styles.recentItem, { backgroundColor: theme.card }]}>
              <Text style={{ color: theme.text, fontSize: 16 }}>
                {item.date.split('-').reverse().slice(0, 2).join(' de ')}
              </Text>
              <View style={styles.recentIcons}>
                <Text style={{ color: theme.text, fontWeight: 'bold', marginRight: 10 }}>
                  {selectedMetric === 'sono' ? item.sleep + 'h' : 
                   selectedMetric === 'agua' ? item.water + 'L' : 
                   (item.mood !== null ? item.mood + 1 : '-') + '/5'}
                </Text>
                {selectedMetric === 'sono' && <Ionicons name="moon" color="#5C6BC0" size={16} />}
                {selectedMetric === 'agua' && <Ionicons name="water" color="#42A5F5" size={16} />}
                {selectedMetric === 'humor' && <Ionicons name="happy" color="#FFB74D" size={16} />}
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerTitle: { fontSize: 28, fontWeight: "bold", marginBottom: 16 },
  pillContainer: { flexDirection: "row", justifyContent: 'center', gap: 10, marginBottom: 20 },
  pill: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
  pillText: { fontWeight: "600" },
  
  tabsContainer: { flexDirection: 'row', borderRadius: 12, marginBottom: 16, overflow: 'hidden' },
  tabItem: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  activeTabItem: {},
  tabText: { fontWeight: '600', fontSize: 16 },

  chartWrapper: { borderRadius: 16, padding: 10, paddingRight: 20, marginBottom: 20, alignItems: 'center' },
  
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  recentList: { gap: 10 },
  recentItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderRadius: 12, alignItems: 'center' },
  recentIcons: { flexDirection: 'row', alignItems: 'center' }
});