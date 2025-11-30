import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { BottomNavBar } from '../components/BottomNavBar';
//import  Test  from './(tabs)/Test'
import SettingsScreen from './(tabs)/SettingsScreen'
import RegistroAtividades from '../app/(tabs)/RegistroAtividades';
import DashboardScreen from './(tabs)/DashboardScreen';
import HistoricoScreen from './(tabs)/HistoricoScreen';

//const HomeScreen = () => <View style={styles.screen}><Text>Tela Inicial</Text></View>;
//const HistoryScreen = () => <View style={styles.screen}><Text>Tela de Histórico</Text></View>;
//const RegisterScreen = () => <View style={styles.screen}><Text>Tela de Registro</Text></View>;
const IAScreen = () => <View style={styles.screen}><Text>Tela de IA</Text></View>;
//const SettingsScreen = () => <View style={styles.screen}><Text>Tela de Configurações</Text></View>;

const Tab = createBottomTabNavigator();

export default function AppNavigator() {

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setBehaviorAsync('overlay-swipe'); 
    }
  }, []);

  return (
    // <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <BottomNavBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={DashboardScreen} />
        <Tab.Screen name="Historico" component={HistoricoScreen} />
        <Tab.Screen name="Registrar" component={RegistroAtividades} />
        <Tab.Screen name="IA" component={IAScreen} />
        <Tab.Screen name="Configuracoes" component={SettingsScreen} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#F9FAFB'
  }
});
