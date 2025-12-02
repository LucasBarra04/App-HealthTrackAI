import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface RecommendationCardProps {
  icon: string;
  text: string;
  actionLabel: string;
  onAction: () => void;
}

export const RecommendationCard = ({ icon, text, actionLabel, onAction }: RecommendationCardProps) => {
  const { theme } = useTheme();
  const [isActive, setIsActive] = useState(false); 

  const handlePress = () => {
    setIsActive(!isActive); 
    onAction(); 
  };

  const getIcon = () => {
    let iconName: keyof typeof Ionicons.glyphMap = 'bulb';
    let bgColor = '#FEF3C7';
    let iconColor = theme.accent;

    if (icon === 'moon') {
      iconName = 'moon';
      bgColor = '#E0E7FF';
      iconColor = theme.primary;
    } else if (icon === 'droplet' || icon === 'water') {
      iconName = 'water';
      bgColor = '#D1FAE5';
      iconColor = theme.success;
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
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <View style={styles.leftContent}>
        {getIcon()}
        <Text style={[styles.text, { color: theme.text }]}>{text}</Text>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.button, 
          { backgroundColor: isActive ? theme.success : theme.background } 
        ]} 
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.buttonText, 
          { color: isActive ? '#FFFFFF' : theme.text } 
        ]}>
          {isActive ? 'Ativo' : actionLabel} 
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '500',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
  }
});