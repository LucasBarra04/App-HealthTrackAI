import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardExercicio } from "../../components/CardExercicio";
import { CardResumo } from '../../components/CardResumo';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { gerarDicaDoDiaMock, gerarRecomendacoesSemanaMock } from "../services/chatgpt";

interface Exercise {
  name: string;
  bodyPart: string;
  equipment?: string;
  target?: string;
  gifUrl?: string;
  seriesReps?: string;
}

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
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { todayData } = useData();

  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const [iaDailyTip, setIaDailyTip] = useState<string[]>([]);
  const [iaWeeklyText, setIaWeeklyText] = useState<string[]>([]);
  const [loadingIaTips, setLoadingIaTips] = useState(false);

  const [exercicios, setExercicios] = useState<Exercise[]>([]);
  const [loadingEx, setLoadingEx] = useState(false);

  function gerarSeriesRepeticoes() {
    const series = Math.floor(Math.random() * 2) + 3;
    const reps = Math.floor(Math.random() * 6) + 10;
    return `${series} séries de ${reps} repetições`;
  }

  async function carregarExercicios() {
    try {
      setLoadingEx(true);

      const userKey = `@exercicios_${userName}`;
      const cache = await AsyncStorage.getItem(userKey);

      if (cache) {
        setExercicios(JSON.parse(cache));
        setLoadingEx(false);
        return;
      }

      const response = await fetch(
        "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
      );

      const data: Exercise[] = await response.json();
      const escolhidos = data.sort(() => 0.5 - Math.random()).slice(0, 2);

      const comSeries = escolhidos.map(ex => ({
        ...ex,
        seriesReps: gerarSeriesRepeticoes()
      }));

      setExercicios(comSeries);
      await AsyncStorage.setItem(userKey, JSON.stringify(comSeries));

    } catch (error) {
      console.log("Erro ao carregar exercícios:", error);
    } finally {
      setLoadingEx(false);
    }
  }

  async function handleRefreshAITips() {
    try {
      setLoadingIaTips(true);

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
    (async () => {
      const storedName = await AsyncStorage.getItem("@userName");
      setUserName(storedName);

      handleRefreshAITips();
      if (storedName) carregarExercicios();
    })();
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

          <TouchableOpacity
            style={[styles.profileButton, { backgroundColor: theme.card }]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="person" size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <CardResumo icon="moon" value={`${Number(todayData.sleep).toFixed(1)}h`} goal={`${METAS.sono}h`} progress={todayData.sleep / METAS.sono} color="#5C6BC0" />
          <CardResumo icon="water" value={`${Number(todayData.water).toFixed(1)}L`} goal={`${METAS.agua}L`} progress={todayData.water / METAS.agua} color="#42A5F5" />
          <CardResumo icon="happy" value={humorDisplay > 0 ? `${humorDisplay}/5` : '-'} goal="" progress={humorDisplay / 5} color="#FFB74D" />
          <CardResumo icon='walk' value={temAtividade ? todayData.activity : 'Nenhuma'} goal={undefined} progress={temAtividade ? 1 : 0} color="#78909C" />
        </View>

        <View style={[styles.tipWrapper, { backgroundColor: '#FDE68A' }]}>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              Dica do Dia <Ionicons name="sparkles" size={16} color="#F59E0B" />
            </Text>

            {loadingIaTips ? (
              <ActivityIndicator color="#92400E" size="small" />
            ) : (
              iaDailyTip.map((msg, i) => (
                <Text key={i} style={styles.tipText}>• {msg}</Text>
              ))
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

        <CardExercicio exercicios={exercicios}/>

        <View style={[styles.weekBox, { backgroundColor: theme.card }]}>
          <Text style={[styles.weekTitle, { color: theme.text }]}>
            Recomendações da Semana
          </Text>

          {iaWeeklyText.map((msg, i) => (
            <Text key={i} style={[styles.weekItem, { color: theme.text }]}>
              • {msg}
            </Text>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.modalBox, { backgroundColor: theme.card }]}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Conta
            </Text>

            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Configuracoes");
              }}
            >
              <Text style={[styles.modalItemText, { color: theme.text }]}>
                Configurações
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={async () => {
                await AsyncStorage.removeItem("@userName");
                setModalVisible(false);
                navigation.reset({
                  index: 0,
                  routes: [{ name: "index" }]
                });
              }}
            >
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>

          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  contentContainer: { padding: 16, paddingBottom: 100 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
    paddingHorizontal: 4,
  },
  greeting: { fontSize: 26, fontWeight: 'bold' },
  date: { fontSize: 16, marginTop: 4 },
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
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  tipText: { fontSize: 13, lineHeight: 18, marginBottom: 6 },
  refreshButton: { marginLeft: 14, padding: 6 },
  weekBox: {
    marginTop: 28,
    padding: 18,
    borderRadius: 16,
    elevation: 3,
  },
  weekTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  weekItem: { fontSize: 14, marginBottom: 6 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "75%",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  modalItem: { paddingVertical: 12 },
  modalItemText: { fontSize: 16 },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
