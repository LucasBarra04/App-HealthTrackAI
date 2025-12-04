import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardResumo } from '../../components/CardResumo';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import {
  gerarDicaDoDiaMock,
  gerarRecomendacoesSemanaMock
} from "../service/chatgpt"; 

const capitalizeFirstLetter = (string: string | null) => {
  if (!string) return 'Usuário';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getFormattedDate = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  };
  return now.toLocaleDateString('pt-BR', options).replace('.', '');
};

export default function DashboardScreen() {
  const { theme } = useTheme();
  const { todayData } = useData();

  const [userName, setUserName] = useState<string | null>(null);
  const [iaDailyTip, setIaDailyTip] = useState<string[]>([]);
  const [iaWeeklyText, setIaWeeklyText] = useState<string[]>([]);
  const [loadingIaTips, setLoadingIaTips] = useState(false);

  async function handleRefreshAITips() {
    setLoadingIaTips(true);
    try {
      const dicas = await gerarDicaDoDiaMock();
      const recomendacoes = await gerarRecomendacoesSemanaMock();

      setIaDailyTip(dicas);
      setIaWeeklyText(recomendacoes);
    } catch (error) {
      console.error("Erro no mock de IA:", error);
    } finally {
      setLoadingIaTips(false);
    }
  }

  useEffect(() => {
    async function loadUser() {
      try {
        const storedName = await AsyncStorage.getItem("@userName");
        setUserName(storedName);
      } catch (e) {
        console.log("Erro ao carregar nome:", e);
      }
    }
    loadUser();
    handleRefreshAITips();
  }, []);

  const METAS = { sono: 8, agua: 2.5 };
  const humorDisplay = todayData.mood !== null ? todayData.mood + 1 : 0;
  const temAtividade = todayData.activity.length > 0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.text }]}>
              Olá, {capitalizeFirstLetter(userName)}!
            </Text>
            <Text style={[styles.date, { color: theme.textSecondary }]}>
              {getFormattedDate()}
            </Text>
          </View>

          <TouchableOpacity style={[styles.profileButton, { backgroundColor: theme.card }]}>
            <Ionicons name="person" size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <CardResumo 
            icon="moon" 
            value={`${Number(todayData.sleep).toFixed(1)}h`} 
            goal={`${METAS.sono}h`} 
            progress={todayData.sleep / METAS.sono} 
            color="#5C6BC0" 
          />
          <CardResumo 
            icon="water" 
            value={`${Number(todayData.water).toFixed(1)}L`} 
            goal={`${METAS.agua}L`} 
            progress={todayData.water / METAS.agua} 
            color="#42A5F5" 
          />
          <CardResumo 
            icon="happy" 
            value={humorDisplay > 0 ? `${humorDisplay}/5` : '-'} 
            goal="" 
            progress={humorDisplay / 5} 
            color="#FFB74D" 
          />
          <CardResumo 
            icon='walk' 
            value={temAtividade ? todayData.activity : 'Nenhuma'} 
            goal={undefined} 
            progress={temAtividade ? 1 : 0} 
            color="#78909C" 
          />
        </View>

        <View style={[styles.tipWrapper, { backgroundColor: '#FDE68A' }]}>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              Dica do Dia <Ionicons name="sparkles" size={16} color="#F59E0B" />
            </Text>

            {loadingIaTips ? (
              <ActivityIndicator color="#92400E" size="small" />
            ) : iaDailyTip.length > 0 ? (
              iaDailyTip.map((msg, i) => (
                <Text key={i} style={styles.tipText}>• {msg}</Text>
              ))
            ) : (
              <Text style={styles.tipText}>Carregando dica...</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={handleRefreshAITips}
            disabled={loadingIaTips}
          >
            <Ionicons
              name="refresh"
              size={22}
              color={loadingIaTips ? "#aaa" : "#92400E"}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.weekBox, { backgroundColor: theme.card }]}>
          <Text style={[styles.weekTitle, { color: theme.text }]}>
            Recomendações da Semana
          </Text>

          {loadingIaTips ? (
            <ActivityIndicator size="small" color={theme.primary} />
          ) : iaWeeklyText.length > 0 ? (
            iaWeeklyText.map((msg, i) => (
              <Text key={i} style={[styles.weekItem, { color: theme.text }]}>
                • {msg}
              </Text>
            ))
          ) : (
            <Text style={{ color: theme.textSecondary }}>Nenhuma recomendação disponível.</Text>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
    paddingHorizontal: 4,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    marginTop: 4,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },

  tipWrapper: {
    marginTop: 24,
    borderRadius: 20,
    paddingHorizontal: 20,
    minHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  tipContent: { flex: 1, paddingVertical: 15 },
  tipTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#451A03',
    lineHeight: 18,
    marginBottom: 6,
  },
  refreshButton: {
    marginLeft: 14,
    padding: 6,
  },

  weekBox: {
    marginTop: 28,
    padding: 18,
    borderRadius: 16,
    elevation: 3,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  weekItem: {
    fontSize: 14,
    marginBottom: 6,
  },
});