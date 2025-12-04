import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text, 
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from '../AppNavigator'; 
import { ThemeProvider, useTheme } from '../../context/ThemeContext'; 

export default function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return (
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />
    </SafeAreaProvider>
  );
}

function LoginScreen({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const { theme, isDark } = useTheme(); 
  
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const validCredentials: Record<string, string> = {
      'lucas': '123',
      'thiago': '456',
      'mateus': '789'
    };

    const normalizedUser = user.toLowerCase().trim();

    if (validCredentials[normalizedUser] && validCredentials[normalizedUser] === password) {
      setError('');
      await AsyncStorage.setItem("@userName", user.trim());
      onLoginSuccess();
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />
      
      <View style={[styles.contentContainer, { backgroundColor: theme.card, shadowColor: theme.text }]}>
        <View style={styles.header}>
          <View style={[styles.logoBox, { backgroundColor: isDark ? '#333' : '#E0E7FF' }]}>
            <Ionicons name="fitness" size={40} color={theme.primary} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>Bem-vindo</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Faça login para continuar sua jornada
          </Text>
        </View>

        <View style={styles.form}>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Usuário</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.background, 
                borderColor: theme.border, 
                color: theme.text 
              }]}
              placeholder="Digite seu nome"
              placeholderTextColor={theme.textSecondary}
              value={user}
              onChangeText={setUser}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Senha</Text>
            <View style={[styles.passwordContainer, { 
                backgroundColor: theme.background, 
                borderColor: theme.border 
            }]}>
              <TextInput
                style={[styles.passwordInput, { color: theme.text }]}
                placeholder="Digite sua senha"
                placeholderTextColor={theme.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color={theme.textSecondary} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color={theme.error} />
              <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.primary, shadowColor: theme.primary }]} 
            activeOpacity={0.8}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '90%',
    borderRadius: 24,
    padding: 32,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -10,
    marginBottom: 20,
    justifyContent: 'center'
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});