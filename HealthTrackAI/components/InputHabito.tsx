import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

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

    return <Ionicons name={iconName} size={24} color={COLORS.text} />;
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
          <Text style={styles.label}>{label}</Text>
        </View>
        {type === 'slider' && (
          <Text style={styles.valueDisplay}>
            {/* APLICA A FORMATAÇÃO AQUI */}
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
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.border}
          thumbTintColor={COLORS.card} 
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
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  labelContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  label: { fontSize: 18, fontWeight: '500', color: COLORS.text },
  valueDisplay: { fontSize: 16, color: COLORS.textSecondary, fontVariant: ['tabular-nums'] }, // tabular-nums evita que o texto pule
  emojiContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 },
  emoji: { fontSize: 32, opacity: 0.4 },
  emojiSelected: { opacity: 1, transform: [{ scale: 1.2 }] },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 14, fontSize: 16, color: COLORS.text, backgroundColor: COLORS.card }
});