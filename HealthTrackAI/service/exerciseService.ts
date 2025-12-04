import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Exercise {
  name: string;
  bodyPart: string;
  target?: string;
  gifUrl?: string;
  equipment?: string;
  seriesReps?: string;
}

function gerarSeriesRepeticoes() {
  const series = Math.floor(Math.random() * 2) + 3; 
  const reps = Math.floor(Math.random() * 6) + 10;
  return `${series} séries de ${reps} repetições`;
}

const API_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json";

export async function getExerciciosDoDia(): Promise<Exercise[]> {
  try {
    const cache = await AsyncStorage.getItem("@exerciciosDia");
    if (cache) {
      return JSON.parse(cache);
    }
    const response = await fetch(API_URL);
    const data: Exercise[] = await response.json();

    const shuffled = data.sort(() => Math.random() - 0.5);
    const escolhidos = shuffled.slice(0, 2).map(ex => ({
      ...ex,
      seriesReps: gerarSeriesRepeticoes()
    }));

    await AsyncStorage.setItem("@exerciciosDia", JSON.stringify(escolhidos));

    return escolhidos;

  } catch (error) {
    console.error("Erro ao buscar exercícios:", error);
    return [];
  }
}
    