import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const BottomNavBar = ({ state, descriptors, navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.navBackground, 
      borderTopColor: theme.border 
    }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        const getIconName = () => {
          switch (route.name) {
            case 'Home': return isFocused ? 'home' : 'home-outline';
            case 'Historico': return isFocused ? 'stats-chart' : 'stats-chart-outline';
            case 'Registrar': return 'add-circle';
            case 'IA': return isFocused ? 'sparkles' : 'sparkles-outline';
            case 'Configuracoes': return isFocused ? 'settings' : 'settings-outline';
            default: return 'help-circle-outline';
          }
        };

        const iconColor = isFocused ? theme.primary : theme.textSecondary;
        const isMiddleButton = route.name === 'Registrar';

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
          >
            {isMiddleButton ? (
              <View style={[styles.middleButtonContainer, { backgroundColor: theme.primary, shadowColor: theme.primary }]}>
                <Ionicons name="add" size={32} color="#FFFFFF" />
              </View>
            ) : (
              <Ionicons name={getIconName()} size={24} color={iconColor} />
            )}
            
            {!isMiddleButton && (
              <Text style={[styles.label, { color: iconColor }]}>
                {typeof label === 'string' ? label : route.name}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    borderTopWidth: 1,
    elevation: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
  middleButtonContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  }
});