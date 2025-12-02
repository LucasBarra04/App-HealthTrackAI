import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RecommendationCard } from '../components/RecommendationCard';
import { COLORS } from '../constants/theme';

export default function RecomendacoesIA() {
  const [mostrarDicas, setMostrarDicas] = useState(false);

  const textoAnaliseSemanal = "Você melhorou seu sono em 1% esta semana. Continue assim! Sua hidratação precisa de atenção.";

  const textoExplicacao = "Manter a consistência em pequenos hábitos gera grandes resultados na saúde a longo prazo.\n\n• O sono regular melhora a função cognitiva e o humor.\n• A hidratação adequada é vital para a energia e digestão.\n• Pausas para meditação reduzem o cortisol (estresse).";

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.headerTitle}>Recomendações IA</Text>

        <LinearGradient
          colors={['#4F46E5', '#7C3AED']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          <Text style={styles.gradientTitle}>Análise da Semana</Text>
          <Text style={styles.gradientText}>
            {textoAnaliseSemanal}
          </Text>
        </LinearGradient>

        <View style={styles.recommendationList}>
          
          <RecommendationCard
            icon="moon"
            text="Tente dormir às 22h hoje"
            actionLabel="Aplicar"
            onAction={() => console.log('Sono aplicado')}
          />

          <RecommendationCard
            icon="water"
            text="Aumente água para 2,5L"
            actionLabel="Aplicar"
            onAction={() => console.log('Água lembrete')}
          />

          <RecommendationCard
            icon="meditation"
            text="Experimente 5min de meditação"
            actionLabel="Aplicar"
            onAction={() => console.log('Meditação aplicada')}
          />

        </View>

        <View style={styles.accordionContainer}>
          <TouchableOpacity 
            style={styles.accordionHeader} 
            activeOpacity={0.7}
            onPress={() => setMostrarDicas(!mostrarDicas)}
          >
            <View style={styles.footerContent}>
              <Ionicons name="information-circle-outline" size={24} color={COLORS.textSecondary} />
              <Text style={styles.footerText}>Por que isso importa?</Text>
            </View>
            <Ionicons 
              name={mostrarDicas ? "chevron-up" : "chevron-down"} 
              size={20} 
              color={COLORS.textSecondary} 
            />
          </TouchableOpacity>
          
          {mostrarDicas && (
            <View style={styles.accordionBody}>
              <Text style={styles.accordionText}>
                {textoExplicacao}
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 60, 
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  gradientCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  gradientTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  gradientText: {
    fontSize: 16,
    color: '#E0E7FF',
    lineHeight: 24,
  },
  recommendationList: {
    gap: 4, 
  },
  accordionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  accordionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  accordionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginTop: 12,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  }
});