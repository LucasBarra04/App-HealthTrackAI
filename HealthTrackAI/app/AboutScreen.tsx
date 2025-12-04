import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function AboutScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20' }]}>
                <Ionicons name="information" size={40} color={theme.primary} />
            </View>
            <Text style={[styles.title, { color: theme.text }]}>Sobre o App</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.description, { color: theme.text }]}>
            HealthTrackAi é um app que ajuda o usuário a monitorar seus hábitos diários (sono, água, exercícios, humor) e usa IA para gerar insights e recomendações personalizadas.
          </Text>
        </View>

        <View style={[styles.section, { borderTopColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
                DESENVOLVIDO POR
            </Text>
            
            <View style={[styles.teamCard, { backgroundColor: theme.card }]}>
                <Text style={[styles.teamMember, { color: theme.text }]}>• Mateus Ramos</Text>
                <Text style={[styles.teamMember, { color: theme.text }]}>• Lucas Barra</Text>
                <Text style={[styles.teamMember, { color: theme.text }]}>• Lucas Mello</Text>
                <Text style={[styles.teamMember, { color: theme.text }]}>• Lucas Nascif</Text>
                <Text style={[styles.teamMember, { color: theme.text }]}>• Thiago Prata</Text>
            </View>
        </View>

        <View style={styles.footer}>
            <Text style={[styles.version, { color: theme.textSecondary }]}>Versão 1.0.0</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
  },
  section: {
    borderTopWidth: 1,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 16,
    textAlign: 'center',
  },
  teamCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  teamMember: {
    fontSize: 16,
    marginVertical: 4,
    fontWeight: '500',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
  }
});