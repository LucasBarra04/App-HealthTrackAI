import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native'; 

import { COLORS } from '../../constants/theme'; 

import { CardResumo } from '../../components/CardResumo';
import { InputHabito } from '../../components/InputHabito';
import { MetricCard } from '../../components/MetricCard';
import { RecommendationCard } from '../../components/RecommendationCard';

export default function Test() {
  
  const [metaSono, setMetaSono] = useState(8); 
  const [horasDormidas, setHorasDormidas] = useState(6.5);
  const [litrosAgua, setLitrosAgua] = useState(2.0);
  const [litrosBebidos, setLitrosBebidos] = useState(1.5);
  const [humor, setHumor] = useState(2);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
    >
      
      <View style={styles.row}>
        <CardResumo
          icon='moon'
          value={`${horasDormidas}h`}
          goal={`${metaSono}h`}
          progress={horasDormidas / metaSono} 
          color={COLORS.primary} 
        />

        <CardResumo
          icon='water'
          value={`${litrosBebidos}`}
          goal={`${litrosAgua}L`}
          progress={litrosBebidos / litrosAgua}
          color={COLORS.primary}
        />
      </View>

      <InputHabito
        type="slider"
        label="Sono"
        icon="moon"
        unit="h"
        min={4}
        max={12}
        value={horasDormidas} 
        onChange={setHorasDormidas} 
      />

      <InputHabito
        type="slider"
        label="Água"
        icon="water" 
        unit="L"
        min={0}
        max={5}
        value={litrosBebidos}
        onChange={setLitrosBebidos}
      />

      <InputHabito
        type="emoji-picker"
        label="Humor"
        icon="happy" 
        value={humor}
        onChange={(novoValor) => setHumor(novoValor)}
      />

      <View style={styles.row}>
        <MetricCard
          title="Média"
          value="6,8h"
        />

        <MetricCard
          title="Tendência"
          value=""
          trend="up"
        />
        
        <MetricCard
         title="Melhor dia"
         value="Sexta"
        />
      </View>

      <RecommendationCard
        icon="moon"
        text="Tente dormir às 22h hoje"
        actionLabel="Aplicar"
        onAction={() => console.log('Lembrete definido')}
      />
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    padding: 20, 
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', 
    marginBottom: 16
  }
}); 