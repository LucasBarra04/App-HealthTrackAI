import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down';
}

export const MetricCard = ({ title, value, trend }: MetricCardProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Text style={[styles.title, { color: theme.textSecondary }]}>{title}</Text>
      
      {trend ? (
        <View style={styles.trendContainer}>
          {trend === 'up' ? (
            <Ionicons name="trending-up" size={32} color={theme.success} />
          ) : (
            <Ionicons name="trending-down" size={32} color={theme.accent} />
          )}
        </View>
      ) : (
        <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    aspectRatio: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  value: {
    fontSize: 16, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  trendContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});