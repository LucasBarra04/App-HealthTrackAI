import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./app/AppNavigator";
import { AuthProvider } from "./app/AuthContext";
import { DataProvider } from "./context/DataContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Barra do celular NÃO ocupa espaço */}
      <StatusBar style="light" translucent />

      <View style={{ flex: 1 }}>
        <AuthProvider>
          <ThemeProvider>
            <DataProvider>
              <AppNavigator />
            </DataProvider>
          </ThemeProvider>
        </AuthProvider>
      </View>
    </SafeAreaProvider>
  );
}
