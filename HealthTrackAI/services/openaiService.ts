const API_KEY =

/* ======================================================
    FUNÇÃO BASE — NOVO ENDPOINT /v1/responses
====================================================== */
async function callOpenAI(prompt: string, maxTokens: number): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: prompt,
        max_output_tokens: maxTokens,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Erro OpenAI:", data);
      throw new Error(data.error?.message || "Falha na chamada à OpenAI");
    }

    return (data.output_text ?? "").trim();
  } catch (error) {
    console.error("Erro ao consultar OpenAI:", error);
    return "";
  }
}

/* ======================================================
    DICA DO DIA
====================================================== */
export async function getDailyTip(today: {
  sleep: number;
  water: number;
  mood: number | null;
  activity: string;
}): Promise<string> {
  const prompt = `
Gere UMA dica do dia, em português, com 1 a 2 frases,
baseada nos hábitos do usuário.

Dados:
- Sono: ${today.sleep}h
- Água: ${today.water}L
- Humor: ${today.mood}
- Atividade: ${today.activity || "nenhuma"}

Regras:
- Não use markdown
- Não use listas
- Não repita informação
- Seja motivacional e prática
`;

  const text = await callOpenAI(prompt, 80);

  return (
    text ||
    "Mantenha a consistência — pequenos ajustes hoje criam grandes resultados amanhã."
  );
}

/* ======================================================
    RECOMENDAÇÕES SEMANAIS (JSON)
====================================================== */
export type WeeklyRecommendations = {
  sleep: string;
  water: string;
  wellbeing: string;
};

export async function getWeeklyRecommendations(
  weekData: any[]
): Promise<WeeklyRecommendations> {
  const prompt = `
Analise os dados dos últimos 7 dias e gere 3 recomendações curtas.

JSON dos dados:
${JSON.stringify(weekData)}

Responda somente assim:
{
  "sleep": "texto",
  "water": "texto",
  "wellbeing": "texto"
}
`;

  const raw = await callOpenAI(prompt, 200);
  const cleaned = raw.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned);

    return {
      sleep: parsed.sleep || "Ajuste sua rotina de sono para mais regularidade.",
      water: parsed.water || "Tente se hidratar de forma mais distribuída.",
      wellbeing:
        parsed.wellbeing ||
        "Inclua pequenas pausas de bem-estar ao longo da semana.",
    };
  } catch (e) {
    console.warn("Falha ao fazer parse da IA:", e, cleaned);

    return {
      sleep: "Estabeleça horários consistentes para dormir e acordar.",
      water: "Mantenha hidratação constante ao longo do dia.",
      wellbeing:
        "Inclua breves momentos de autocuidado como alongamentos ou pausas.",
    };
  }
}
