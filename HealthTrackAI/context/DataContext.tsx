import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getDailyTip,
  getWeeklyRecommendations,
  WeeklyRecommendations,
} from "../services/openaiService";

export interface DailyRecord {
  date: string;
  sleep: number;
  water: number;
  mood: number | null;
  activity: string;
}

interface DataContextType {
  todayData: DailyRecord;
  history: DailyRecord[];
  updateTodayData: (data: Partial<DailyRecord>) => void;
  saveData: () => void;

  // IA
  dailyTip: string | null;
  weeklyTips: WeeklyRecommendations | null;
  loadingTips: boolean;
  refreshTips: () => void;
}

const INITIAL_HISTORY: DailyRecord[] = [
  { date: '2025-11-30', sleep: 7.5, water: 2.5, mood: 4, activity: 'Caminhada' },
  { date: '2025-11-29', sleep: 8.0, water: 3.0, mood: 4, activity: 'Academia' },
  { date: '2025-11-28', sleep: 6.5, water: 2.0, mood: 3, activity: 'Yoga' },
  { date: '2025-11-27', sleep: 5.5, water: 1.5, mood: 2, activity: '' },
  { date: '2025-11-26', sleep: 7.0, water: 2.2, mood: 3, activity: 'Corrida' },
  { date: '2025-11-25', sleep: 7.5, water: 2.8, mood: 4, activity: 'Natação' },
  { date: '2025-11-24', sleep: 6.0, water: 1.8, mood: 1, activity: '' },
  { date: '2025-11-23', sleep: 8.5, water: 3.2, mood: 4, activity: 'Caminhada' },
  { date: '2025-11-22', sleep: 9.0, water: 3.0, mood: 4, activity: 'Academia' },
  { date: '2025-11-21', sleep: 6.5, water: 2.0, mood: 2, activity: 'Yoga' },
  { date: '2025-11-20', sleep: 7.0, water: 2.5, mood: 3, activity: 'Corrida' },
  { date: '2025-11-19', sleep: 5.0, water: 1.2, mood: 1, activity: '' },
  { date: '2025-11-18', sleep: 7.5, water: 2.8, mood: 4, activity: 'Natação' },
  { date: '2025-11-17', sleep: 8.0, water: 2.5, mood: 3, activity: 'Caminhada' },
  { date: '2025-11-16', sleep: 8.5, water: 3.0, mood: 4, activity: 'Academia' },
  { date: '2025-11-15', sleep: 6.0, water: 1.8, mood: 2, activity: '' },
  { date: '2025-11-14', sleep: 7.0, water: 2.2, mood: 3, activity: 'Yoga' },
  { date: '2025-11-13', sleep: 7.5, water: 2.6, mood: 4, activity: 'Corrida' },
  { date: '2025-11-12', sleep: 6.5, water: 2.0, mood: 2, activity: 'Natação' },
  { date: '2025-11-11', sleep: 5.5, water: 1.5, mood: 1, activity: '' },
  { date: '2025-11-10', sleep: 7.0, water: 2.4, mood: 3, activity: 'Caminhada' },
  { date: '2025-11-09', sleep: 8.0, water: 3.0, mood: 4, activity: 'Academia' },
  { date: '2025-11-08', sleep: 7.5, water: 2.5, mood: 3, activity: 'Yoga' },
  { date: '2025-11-07', sleep: 6.0, water: 1.9, mood: 2, activity: '' },
  { date: '2025-11-06', sleep: 7.2, water: 2.3, mood: 3, activity: 'Corrida' },
  { date: '2025-11-05', sleep: 6.8, water: 2.1, mood: 2, activity: 'Natação' },
  { date: '2025-11-04', sleep: 8.2, water: 2.9, mood: 4, activity: 'Caminhada' },
  { date: '2025-11-03', sleep: 7.0, water: 2.5, mood: 3, activity: 'Academia' },
  { date: '2025-11-02', sleep: 9.0, water: 3.5, mood: 4, activity: 'Yoga' },
  { date: '2025-11-01', sleep: 5.8, water: 1.6, mood: 1, activity: '' },
];

const DataContext = createContext<DataContextType>({} as DataContextType);

export function DataProvider({ children }: { children: ReactNode }) {
  const getTodayStr = () => new Date().toISOString().split("T")[0];

  const [history, setHistory] = useState<DailyRecord[]>(INITIAL_HISTORY);

  const [todayData, setTodayData] = useState<DailyRecord>({
    date: getTodayStr(),
    sleep: 0,
    water: 0,
    mood: null,
    activity: "",
  });

  const [dailyTip, setDailyTip] = useState<string | null>(null);
  const [weeklyTips, setWeeklyTips] = useState<WeeklyRecommendations | null>(null);
  const [loadingTips, setLoadingTips] = useState(false);

  // Carrega dados do dia automaticamente
  useEffect(() => {
    const todayStr = getTodayStr();
    const existing = history.find((h) => h.date === todayStr);
    if (existing) setTodayData(existing);
  }, [history]);

  const updateTodayData = (newData: Partial<DailyRecord>) =>
    setTodayData((prev) => ({ ...prev, ...newData }));

  const saveData = () => {
    setHistory((prev) => {
      const todayStr = getTodayStr();
      const other = prev.filter((h) => h.date !== todayStr);
      return [todayData, ...other];
    });
  };

  // 🔥 IA INTEGRADA AQUI
  async function refreshTips() {
    try {
      setLoadingTips(true);

      const last7 = history.slice(0, 7);

      const [dica, semana] = await Promise.all([
        getDailyTip(todayData),            // IA analisa o dia atual
        getWeeklyRecommendations(last7),   // IA analisa histórico
      ]);

      setDailyTip(dica);
      setWeeklyTips(semana);

    } catch (err) {
      console.log("Erro ao carregar IA:", err);

      // fallback elegante
      setDailyTip("Mantenha a consistência! Grandes mudanças começam pequeno.");
      setWeeklyTips({
        sleep: "Procure manter horários fixos para dormir e acordar.",
        water: "Hidrate-se ao longo do dia em pequenas doses.",
        wellbeing: "Inclua pausas rápidas de bem-estar durante a semana."
      });

    } finally {
      setLoadingTips(false);
    }
  }

  return (
    <DataContext.Provider
      value={{
        todayData,
        history,
        updateTodayData,
        saveData,
        dailyTip,
        weeklyTips,
        loadingTips,
        refreshTips,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
