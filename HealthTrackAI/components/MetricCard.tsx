import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down';
}

export const MetricCard = ({ title, value, trend }: MetricCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      
      {trend ? (
        <View style={styles.trendContainer}>
          {trend === 'up' ? (
            <Ionicons name="trending-up" size={32} color={COLORS.success} />
          ) : (
            <Ionicons name="trending-down" size={32} color={COLORS.accent} />
          )}
        </View>
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
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
    fontSize:  17,
    color: COLORS.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  trendContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});