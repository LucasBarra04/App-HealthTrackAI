import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  { date: '2025-10-31', sleep: 7.5, water: 2.7, mood: 4, activity: 'Corrida' },
  { date: '2025-10-30', sleep: 6.5, water: 2.2, mood: 3, activity: 'Natação' },
  { date: '2025-10-29', sleep: 7.0, water: 2.5, mood: 3, activity: 'Caminhada' },
  { date: '2025-10-28', sleep: 8.0, water: 3.0, mood: 4, activity: 'Academia' },
  { date: '2025-10-27', sleep: 5.5, water: 1.4, mood: 0, activity: '' },
  { date: '2025-10-26', sleep: 9.0, water: 3.2, mood: 4, activity: 'Yoga' },
  { date: '2025-10-25', sleep: 8.5, water: 3.0, mood: 4, activity: 'Caminhada' },
  { date: '2025-10-24', sleep: 6.0, water: 1.8, mood: 2, activity: 'Corrida' },
  { date: '2025-10-23', sleep: 7.2, water: 2.4, mood: 3, activity: 'Natação' },
  { date: '2025-10-22', sleep: 6.8, water: 2.0, mood: 2, activity: '' },
  { date: '2025-10-21', sleep: 7.5, water: 2.6, mood: 4, activity: 'Academia' },
  { date: '2025-10-20', sleep: 7.0, water: 2.5, mood: 3, activity: 'Yoga' },
  { date: '2025-10-19', sleep: 8.0, water: 2.9, mood: 4, activity: 'Caminhada' },
  { date: '2025-10-18', sleep: 6.5, water: 2.1, mood: 2, activity: '' },
  { date: '2025-10-17', sleep: 5.8, water: 1.5, mood: 1, activity: 'Corrida' },
  { date: '2025-10-16', sleep: 7.5, water: 2.8, mood: 4, activity: 'Natação' },
  { date: '2025-10-15', sleep: 6.2, water: 1.9, mood: 2, activity: '' },
  { date: '2025-10-14', sleep: 7.8, water: 2.7, mood: 4, activity: 'Academia' },
  { date: '2025-10-13', sleep: 8.2, water: 3.1, mood: 4, activity: 'Yoga' },
  { date: '2025-10-12', sleep: 9.0, water: 3.5, mood: 4, activity: 'Caminhada' },
  { date: '2025-10-11', sleep: 5.5, water: 1.3, mood: 0, activity: '' },
  { date: '2025-10-10', sleep: 6.5, water: 2.2, mood: 3, activity: 'Corrida' },
  { date: '2025-10-09', sleep: 7.0, water: 2.5, mood: 3, activity: 'Natação' },
  { date: '2025-10-08', sleep: 7.5, water: 2.8, mood: 4, activity: 'Academia' },
  { date: '2025-10-07', sleep: 6.0, water: 1.8, mood: 2, activity: '' },
  { date: '2025-10-06', sleep: 8.0, water: 3.0, mood: 4, activity: 'Yoga' },
  { date: '2025-10-05', sleep: 7.2, water: 2.4, mood: 3, activity: 'Caminhada' },
  { date: '2025-10-04', sleep: 6.8, water: 2.0, mood: 2, activity: 'Corrida' },
  { date: '2025-10-03', sleep: 5.5, water: 1.5, mood: 1, activity: '' },
  { date: '2025-10-02', sleep: 7.5, water: 2.6, mood: 4, activity: 'Natação' },
  { date: '2025-10-01', sleep: 8.0, water: 3.2, mood: 4, activity: 'Academia' },

  { date: '2025-09-30', sleep: 6.5, water: 2.1, mood: 3, activity: 'Yoga' },
  { date: '2025-09-29', sleep: 7.0, water: 2.5, mood: 3, activity: 'Caminhada' },
  { date: '2025-09-28', sleep: 8.5, water: 3.0, mood: 4, activity: '' },
  { date: '2025-09-27', sleep: 5.0, water: 1.2, mood: 0, activity: 'Corrida' },
  { date: '2025-09-26', sleep: 7.5, water: 2.8, mood: 4, activity: 'Natação' },
  { date: '2025-09-25', sleep: 6.0, water: 1.8, mood: 2, activity: 'Academia' },
  { date: '2025-09-24', sleep: 7.2, water: 2.4, mood: 3, activity: '' },
  { date: '2025-09-23', sleep: 8.0, water: 3.1, mood: 4, activity: 'Yoga' },
  { date: '2025-09-22', sleep: 6.8, water: 2.0, mood: 2, activity: 'Caminhada' },
  { date: '2025-09-21', sleep: 9.0, water: 3.5, mood: 4, activity: 'Corrida' },
  { date: '2025-09-20', sleep: 5.5, water: 1.5, mood: 1, activity: '' },
  { date: '2025-09-19', sleep: 7.0, water: 2.3, mood: 3, activity: 'Natação' },
  { date: '2025-09-18', sleep: 7.5, water: 2.7, mood: 4, activity: 'Academia' },
  { date: '2025-09-17', sleep: 6.5, water: 2.0, mood: 2, activity: 'Yoga' },
  { date: '2025-09-16', sleep: 6.0, water: 1.8, mood: 2, activity: '' },
  { date: '2025-09-15', sleep: 8.0, water: 3.0, mood: 4, activity: 'Caminhada' },
  { date: '2025-09-14', sleep: 7.2, water: 2.5, mood: 3, activity: 'Corrida' },
  { date: '2025-09-13', sleep: 5.8, water: 1.6, mood: 1, activity: '' },
  { date: '2025-09-12', sleep: 7.8, water: 2.9, mood: 4, activity: 'Natação' },
  { date: '2025-09-11', sleep: 6.5, water: 2.1, mood: 2, activity: 'Academia' },
  { date: '2025-09-10', sleep: 7.0, water: 2.4, mood: 3, activity: 'Yoga' },
  { date: '2025-09-09', sleep: 8.5, water: 3.2, mood: 4, activity: 'Caminhada' },
  { date: '2025-09-08', sleep: 5.5, water: 1.4, mood: 0, activity: '' },
  { date: '2025-09-07', sleep: 9.0, water: 3.3, mood: 4, activity: 'Corrida' },
  { date: '2025-09-06', sleep: 7.5, water: 2.8, mood: 3, activity: 'Natação' },
  { date: '2025-09-05', sleep: 6.2, water: 1.9, mood: 2, activity: 'Academia' },
  { date: '2025-09-04', sleep: 7.0, water: 2.5, mood: 3, activity: '' },
  { date: '2025-09-03', sleep: 8.0, water: 3.0, mood: 4, activity: 'Yoga' },
  { date: '2025-09-02', sleep: 6.8, water: 2.2, mood: 2, activity: 'Caminhada' },
];

const DataContext = createContext<DataContextType>({} as DataContextType);

export function DataProvider({ children }: { children: ReactNode }) {
  const getTodayStr = () => new Date().toISOString().split('T')[0];

  const [history, setHistory] = useState<DailyRecord[]>(INITIAL_HISTORY);
  
  const [todayData, setTodayData] = useState<DailyRecord>({
    date: getTodayStr(),
    sleep: 0,
    water: 0,
    mood: null,
    activity: '',
  });

  useEffect(() => {
    const todayStr = getTodayStr();
    const existingEntry = history.find(h => h.date === todayStr);
    if (existingEntry) {
      setTodayData(existingEntry);
    }
  }, []);

  const updateTodayData = (newData: Partial<DailyRecord>) => {
    setTodayData(prev => ({ ...prev, ...newData }));
  };

  const saveData = () => {
    setHistory(prevHistory => {
      const todayStr = getTodayStr();
      const otherDays = prevHistory.filter(h => h.date !== todayStr);
      return [todayData, ...otherDays];
    });
  };

  return (
    <DataContext.Provider value={{ todayData, history, updateTodayData, saveData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}