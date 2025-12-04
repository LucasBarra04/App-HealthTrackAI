import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { BottomNavBar } from '../components/BottomNavBar';
import { DataProvider } from '../context/DataContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

import DashboardScreen from './(tabs)/DashboardScreen';
import HistoricoScreen from './(tabs)/HistoricoScreen';
import RecomendacoesIA from './(tabs)/RecomendaçõesIA';
import RegistroAtividades from './(tabs)/RegistroAtividades';
import SettingsScreen from './(tabs)/SettingsScreen';
import AboutScreen from './AboutScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Historico" component={HistoricoScreen} />
      <Tab.Screen name="Registrar" component={RegistroAtividades} />
      <Tab.Screen name="IA" component={RecomendacoesIA} />
      <Tab.Screen name="Configuracoes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.card,
          shadowColor: 'transparent',
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: theme.background,
          width: 280,
        },
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.textSecondary,
        drawerLabelStyle: {
            marginLeft: -20,
            fontSize: 16,
            fontWeight: '500',
        },
      }}
    >
      <Drawer.Screen 
        name="Principal" 
        component={TabNavigator} 
        options={{
            title: 'HealthTrack AI',
            drawerIcon: ({ color }) => (
                <Ionicons name="home-outline" size={22} color={color} />
            )
        }}
      />
      <Drawer.Screen 
        name="Sobre" 
        component={AboutScreen} 
        options={{
            drawerIcon: ({ color }) => (
                <Ionicons name="information-circle-outline" size={22} color={color} />
            )
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setBehaviorAsync('overlay-swipe'); 
    }
  }, []);

  return (
    <ThemeProvider>
      <DataProvider>
        <DrawerNavigator />
      </DataProvider>
    </ThemeProvider>
  );
}