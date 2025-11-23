import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

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
  const iconName = getIconName(icon);

  const BLUE_COLOR = '#3B82F6'; 

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons 
          name={iconName} 
          size={24} 
          color={color} 
          style={{ opacity: 0.2, position: 'absolute' }} 
        />
        <Ionicons 
          name={iconName} 
          size={24} 
          color={color} 
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.valueText}>
          {value} <Text style={styles.goalText}>{goal ? `/ ${goal}` : ''}</Text>
        </Text>
      </View>

      {progress !== undefined && (
        <View style={styles.progressTrack}>
          <View 
            style={[
              styles.progressBar, 
              { 
                width: `${Math.min(progress * 100, 100)}%`, 
                backgroundColor: BLUE_COLOR 
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
    backgroundColor: COLORS.card,
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
    color: COLORS.text,
  },
  goalText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: 'normal',
  },
  progressTrack: {
    height: 6,
    backgroundColor: COLORS.background, 
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  }
});