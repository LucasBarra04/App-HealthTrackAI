import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface RecommendationCardProps {
  icon: string;
  text: string;
  actionLabel: string;
  onAction: () => void;
}

export const RecommendationCard = ({ icon, text, actionLabel, onAction }: RecommendationCardProps) => {
  const getIcon = () => {
    let iconName: keyof typeof Ionicons.glyphMap = 'bulb';
    let bgColor = '#FEF3C7';
    let iconColor = COLORS.accent;

    if (icon === 'moon') {
      iconName = 'moon';
      bgColor = '#E0E7FF';
      iconColor = COLORS.primary;
    } else if (icon === 'droplet' || icon === 'water') {
      iconName = 'water';
      bgColor = '#D1FAE5';
      iconColor = COLORS.success;
    } else if (icon === 'meditation' || icon === 'body') {
      iconName = 'body'; 
      bgColor = '#F3E8FF'; 
      iconColor = '#8B5CF6'; 
    }

    return (
      <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
        <Ionicons name={iconName} size={24} color={iconColor} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        {getIcon()}
        <Text style={styles.text}>{text}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={onAction}>
        <Text style={styles.buttonText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  text: {
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  }
});