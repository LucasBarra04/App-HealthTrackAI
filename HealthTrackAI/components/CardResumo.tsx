import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

interface CardResumoProps {
  icon: string;
  value: string;
  goal?: string;
  progress?: number;
  color: string;
}

const getIconName = (name: string): keyof typeof Ionicons.glyphMap => {
  const map: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    moon: 'moon',
    droplet: 'water',
    water: 'water',
    smile: 'happy',
    happy: 'happy',
    activity: 'walk',
    walk: 'walk'
  };
  return map[name] || 'help-circle';
};

export const CardResumo = ({ icon, value, goal, progress, color }: CardResumoProps) => {
  const { theme } = useTheme(); // Hook do tema
  const iconName = getIconName(icon);
  const displayColor = color || theme.primary;

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.header}>
        <Ionicons 
          name={iconName} 
          size={24} 
          color={displayColor} 
          style={{ opacity: 0.2, position: 'absolute' }} 
        />
        <Ionicons 
          name={iconName} 
          size={24} 
          color={displayColor} 
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.valueText, { color: theme.text }]}>
          {value} <Text style={[styles.goalText, { color: theme.textSecondary }]}>{goal ? `/ ${goal}` : ''}</Text>
        </Text>
      </View>

      {progress !== undefined && (
        <View style={[styles.progressTrack, { backgroundColor: theme.background }]}>
          <View 
            style={[
              styles.progressBar, 
              { 
                width: `${Math.min(progress * 100, 100)}%`, 
                backgroundColor: displayColor 
              }
            ]} 
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    marginBottom: 12,
    height: 24, 
    width: 24,
  },
  content: {
    marginBottom: 8,
  },
  valueText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalText: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  }
});