import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomNavBar } from '../components/BottomNavBar';
import DashboardScreen from './(tabs)/DashboardScreen';

const HomeScreen = () => <View style={styles.screen}><Text>Tela Inicial</Text></View>;
const HistoryScreen = () => <View style={styles.screen}><Text>Tela de Histórico</Text></View>;
const RegisterScreen = () => <View style={styles.screen}><Text>Tela de Registro</Text></View>;
const IAScreen = () => <View style={styles.screen}><Text>Tela de IA</Text></View>;
const SettingsScreen = () => <View style={styles.screen}><Text>Tela de Configurações</Text></View>;

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (

 //   <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <BottomNavBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={DashboardScreen} />
        <Tab.Screen name="Historico" component={HistoryScreen} />
        <Tab.Screen name="Registrar" component={RegisterScreen} />
        <Tab.Screen name="IA" component={IAScreen} />
        <Tab.Screen name="Configuracoes" component={SettingsScreen} />
      </Tab.Navigator>
    //</NavigationContainer>
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
