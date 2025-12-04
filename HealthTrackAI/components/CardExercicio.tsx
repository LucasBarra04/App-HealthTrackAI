import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface Exercise {
  name: string;
  bodyPart: string;
  equipment?: string;
  target?: string;
  gifUrl?: string;
  seriesReps?: string;
}

export function CardExercicio({ exercicios }: { exercicios: Exercise[] }) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border }
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        Exercícios do Dia
      </Text>

      {exercicios.map((ex, index) => (
        <View key={index} style={styles.exItemWrapper}>
          <Text style={[styles.exerciseName, { color: theme.text }]}>
            {ex.name}
          </Text>

          <Text style={[styles.series, { color: theme.textSecondary }]}>
            {ex.seriesReps}
          </Text>

          {ex.gifUrl && (
            <Image
              source={{ uri: ex.gifUrl }}
              style={styles.image}
            />
          )}

          <Text style={[styles.detail, { color: theme.textSecondary }]}>
            Grupo muscular: {ex.bodyPart}
          </Text>

          {!!ex.target && (
            <Text style={[styles.detail, { color: theme.textSecondary }]}>
              Alvo: {ex.target}
            </Text>
          )}

          {!!ex.equipment && (
            <Text style={[styles.detail, { color: theme.textSecondary }]}>
              Equipamento: {ex.equipment}
            </Text>
          )}

          {index < exercicios.length - 1 && (
            <View style={[styles.separator, { backgroundColor: theme.border }]} />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    elevation: 3
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12
  },
  exItemWrapper: {
    marginBottom: 12
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4
  },
  series: {
    fontSize: 14,
    marginBottom: 10
  },
  detail: {
    fontSize: 14,
    marginTop: 4
  },
  separator: {
    height: 1,
    marginVertical: 14,
    width: "100%",
    borderRadius: 20,
    opacity: 0.5
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginVertical: 10
  }
});
