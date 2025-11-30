import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InputHabito } from '../../components/InputHabito';
import { COLORS } from '../../constants/theme'

export default function RegistroAtividades() {
  const [horasDormidas, setHorasDormidas] = useState(0);
  const [litrosBebidos, setLitrosBebidos] = useState(0);
  const [humor, setHumor] = useState(null);
  const [atividade, setAtividade] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>

        <Text style={styles.title}>Registrar Hábitos</Text>
        
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

  
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Ionicons name="walk" size={24} color={COLORS.text} />
              <Text style={styles.labelText}>Atividade Física</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: Corrida matinal"
              placeholderTextColor={COLORS.textSecondary}
              value={atividade}
              onChangeText={setAtividade}
            />
          </View>

          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            onPress={() => console.log("Salvo!", { horasDormidas, litrosBebidos, humor, atividade })}
          >
            <Text style={styles.buttonText}>Salvar Registro</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginVertical: 20,
  },
  title: {
      fontSize: 30,
      alignSelf: 'center',
      paddingTop: 20,
      paddingBottom: 20,
      fontWeight: 'bold',
  },
  inputGroup: {
    marginTop: 24,
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  labelText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: COLORS.primary,
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