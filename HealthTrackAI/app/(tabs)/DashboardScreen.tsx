import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardResumo } from '../../components/CardResumo';
import { useAuth } from '../AuthContext';

const DASH_COLORS = {
  sleep: '#5C6BC0',
  water: '#42A5F5',
  humor: '#FFB74D',
  activity: '#78909C',
  textDark: '#1A1A1A',
  textLight: '#6E7A8A',
  background: '#F9FAFB',
};

const capitalizeFirstLetter = (string: string | null) => {
  if (!string) return 'Usuário';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function DashboardScreen() {
  const { user } = useAuth(); 

  const [dados] = useState({
    sono: { feito: 6.5, meta: 8 },
    agua: { feito: 1.8, meta: 2.5 },
    humor: { nota: 4, max: 5 }, 
    atividade: { tipo: 'Caminhada', intensidade: 'leve' }
  });
return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {capitalizeFirstLetter(user)}!</Text>
            <Text style={styles.date}>Sexta, 22 Nov</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
             <Ionicons name="person" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          
          <CardResumo
            style={styles.card}
            icon='moon'
            value={`${dados.sono.feito}h`}
            goal={`${dados.sono.meta}h`}
            progress={dados.sono.feito / dados.sono.meta} 
            color={DASH_COLORS.sleep} 
          />

          <CardResumo
            style={styles.card}
            icon='water'
            value={`${dados.agua.feito}L`}
            goal={`${dados.agua.meta}L`}
            progress={dados.agua.feito / dados.agua.meta}
            color={DASH_COLORS.water}
          />

          <CardResumo
            style={styles.card}
            icon='happy'
            value={`${dados.humor.nota}/5`}
            goal="" 
            progress={dados.humor.nota / 5}
            color={DASH_COLORS.humor}
          />

          <CardResumo
            style={styles.card}
            icon='walk'
            value={`${dados.atividade.tipo} ${dados.atividade.intensidade}`}
            goal={null} 
            progress={1}
            color={DASH_COLORS.activity}
          />

        </View>

        <View style={styles.tipWrapper}>
            <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>
                    Dica do Dia <Ionicons name="sparkles" size={16} color="#F59E0B" />
                </Text>
                <Text style={styles.tipText} numberOfLines={2}>
                    Você está no caminho certo! Continue assim.
                </Text>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}