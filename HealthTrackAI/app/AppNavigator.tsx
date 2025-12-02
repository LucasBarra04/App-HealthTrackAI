import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { ThemeProvider } from '../context/ThemeContext';
import { DataProvider } from '../context/DataContext';
import { BottomNavBar } from '../components/BottomNavBar';
import RecomendacoesIA from './(tabs)/RecomendacoesIA';
import SettingsScreen from './(tabs)/SettingsScreen';
import RegistroAtividades from './(tabs)/RegistroAtividades';
import DashboardScreen from './(tabs)/DashboardScreen';
import HistoricoScreen from './(tabs)/HistoricoScreen';


const Tab = createBottomTabNavigator();

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
      </DataProvider>
    </ThemeProvider>
  );
}