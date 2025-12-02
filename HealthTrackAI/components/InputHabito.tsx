import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface InputHabitoProps {
  type: 'slider' | 'emoji-picker' | 'text-input' | 'search-input';
  label: string;
  icon: string;
  value: any;
  onChange: (value: any) => void;
  min?: number;
  max?: number;
  unit?: string;
  placeholder?: string;
}

export const InputHabito = ({ type, label, icon, value, onChange, min, max, unit, placeholder }: InputHabitoProps) => {
  const { theme } = useTheme();

  const getIcon = () => {
    let iconName: keyof typeof Ionicons.glyphMap = 'help-circle';

    switch(icon) {
      case 'moon': iconName = 'moon'; break;
      case 'droplet': 
      case 'water': iconName = 'water'; break;
      case 'activity':
      case 'walk': iconName = 'walk'; break;
      case 'utensils':
      case 'restaurant': iconName = 'restaurant'; break;
      case 'happy': iconName = 'happy'; break;
      default: iconName = 'ellipse';
    }

    return <Ionicons name={iconName} size={24} color={theme.text} />;
  };

  const formatValue = (val: any) => {
    if (typeof val === 'number') {
      return Number.isInteger(val) ? val : val.toFixed(1);
    }
    return val;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.labelContainer}>
          {getIcon()}
          <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
        </View>
        {type === 'slider' && (
          <Text style={[styles.valueDisplay, { color: theme.textSecondary }]}>
            {formatValue(value)} {unit}
          </Text>
        )}
      </View>

      {type === 'slider' && (
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={min}
          maximumValue={max}
          step={0.1} 
          value={Number(value) || 0} 
          onValueChange={onChange} 
          minimumTrackTintColor={theme.primary}
          maximumTrackTintColor={theme.border}
          thumbTintColor={theme.card}
        />
      )}

      {type === 'emoji-picker' && (
        <View style={styles.emojiContainer}>
          {['😟', '😐', '🙂', '😊', '😁'].map((emoji, index) => (
            <TouchableOpacity key={index} onPress={() => onChange(index)}>
              <Text style={[styles.emoji, value === index && styles.emojiSelected]}>
                {emoji}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {(type === 'text-input' || type === 'search-input') && (
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.background, 
            borderColor: theme.border, 
            color: theme.text 
          }]}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  labelContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  label: { fontSize: 18, fontWeight: '500' },
  valueDisplay: { fontSize: 16, fontVariant: ['tabular-nums'] },
  emojiContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 },
  emoji: { fontSize: 32, opacity: 0.4 },
  emojiSelected: { opacity: 1, transform: [{ scale: 1.2 }] },
  input: { borderWidth: 1, borderRadius: 12, padding: 14, fontSize: 16 }
});