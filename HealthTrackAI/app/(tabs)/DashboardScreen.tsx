import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardResumo } from '../../components/CardResumo';
import { useAuth } from '../AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

const capitalizeFirstLetter = (string: string | null) => {
  if (!string) return 'Usuário';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getFormattedDate = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
  return now.toLocaleDateString('pt-BR', options).replace('.', '');
};

export default function DashboardScreen() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { todayData } = useData();

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
            <Text style={[styles.greeting, { color: theme.text }]}>Olá, {capitalizeFirstLetter(user)}!</Text>
            <Text style={[styles.date, { color: theme.textSecondary }]}>{getFormattedDate()}</Text>
          </View>
          <TouchableOpacity style={[styles.profileButton, { backgroundColor: theme.card }]}>
             <Ionicons name="person" size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          
          <CardResumo
            icon='moon'
            value={`${todayData.sleep}h`}
            goal={`${METAS.sono}h`}
            progress={todayData.sleep / METAS.sono} 
            color="#5C6BC0" 
          />

          <CardResumo
            icon='water'
            value={`${todayData.water}L`}
            goal={`${METAS.agua}L`}
            progress={todayData.water / METAS.agua}
            color="#42A5F5" 
          />

          <CardResumo
            icon='happy'
            value={humorDisplay > 0 ? `${humorDisplay}/5` : '-'}
            goal="" 
            progress={humorDisplay / 5}
            color="#FFB74D" 
          />

          <CardResumo
            icon='walk'
            value={temAtividade ? todayData.activity : 'Nenhuma'}
            goal={null} 
            progress={temAtividade ? 1 : 0}
            color="#78909C" 
          />

        </View>

        <View style={[styles.tipWrapper, { backgroundColor: '#FDE68A', shadowColor: "#F59E0B" }]}>
            <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>
                    Dica do Dia <Ionicons name="sparkles" size={16} color="#F59E0B" />
                </Text>
                <Text style={styles.tipText} numberOfLines={2}>
                    Mantenha a consistência! Pequenos passos levam a grandes mudanças.
                </Text>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
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
    height: 100, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  tipContent: {
    flex: 1,
    justifyContent: 'center', 
  },
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
  },
});