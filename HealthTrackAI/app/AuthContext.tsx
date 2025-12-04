import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: string | null;
  login: (name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      const storedUser = await AsyncStorage.getItem("@user_name");
      if (storedUser) setUser(storedUser);
    }
    loadUser();
  }, []);

  async function login(name: string) {
    setUser(name);
    await AsyncStorage.setItem("@user_name", name);
  }

  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem("@user_name");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
