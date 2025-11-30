import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InputHabito } from '../../components/InputHabito';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

export default function RegistroAtividades() {
  const { theme } = useTheme();
  const { todayData, updateTodayData, saveData } = useData();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = () => {
    saveData();
    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.contentContainer, { backgroundColor: theme.card }]}>

          <Text style={[styles.title, { color: theme.text }]}>Registrar Hábitos</Text>
        
          <InputHabito
            type="slider"
            label="Sono"
            icon="moon"
            unit="h"
            min={0}
            max={12}
            value={todayData.sleep}
            onChange={(val) => updateTodayData({ sleep: val })}
          />

          <InputHabito
            type="slider"
            label="Água"
            icon="water"
            unit="L"
            min={0}
            max={5}
            value={todayData.water}
            onChange={(val) => updateTodayData({ water: val })}
          />

          <InputHabito
            type="emoji-picker"
            label="Humor"
            icon="happy"
            value={todayData.mood}
            onChange={(val) => updateTodayData({ mood: val })}
          />

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Ionicons name="walk" size={24} color={theme.text} />
              <Text style={[styles.labelText, { color: theme.text }]}>Atividade Física</Text>
            </View>
            <TextInput
              style={[styles.textInput, { 
                borderColor: theme.border, 
                color: theme.text, 
                backgroundColor: theme.background 
              }]}
              placeholder="Ex: Corrida matinal"
              placeholderTextColor={theme.textSecondary}
              value={todayData.activity}
              onChangeText={(text) => updateTodayData({ activity: text })}
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.primary }]} 
            activeOpacity={0.8}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Salvar Registro</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalView, { backgroundColor: theme.card }]}>
            <Ionicons name="checkmark-circle" size={50} color={theme.success} />
            <Text style={[styles.modalText, { color: theme.text }]}>Dados salvos com sucesso!</Text>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  contentContainer: {
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
      fontSize: 24,
      alignSelf: 'center',
      paddingTop: 10,
      paddingBottom: 30,
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
    marginLeft: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
});