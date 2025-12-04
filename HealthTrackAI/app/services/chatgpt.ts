const DICAS_DO_DIA = [
  "Beba um copo de água logo pela manhã.",
  "Faça uma pausa para respirar fundo por 30 segundos.",
  "Alongue o pescoço e ombros por 1 minuto.",
  "Comece o dia definindo uma pequena meta.",
  "Se exponha a um pouco de luz natural.",
  "Evite olhar o celular por 5 minutos após acordar.",
  "Observe sua respiração por 10 segundos."
];

const RECOMENDACOES_SEMANA = [
  "Mantenha horários regulares para dormir e acordar.",
  "Inclua uma pequena caminhada de 10–20 minutos.",
  "Beba água em intervalos regulares.",
  "Faça uma refeição rica em fibras.",
  "Planeje seu objetivo semanal de saúde.",
  "Separe 15 minutos para relaxamento.",
  "Tente evitar telas 30 minutos antes de dormir."
];

function pegarAleatorias(lista: string[], quantidade: number): string[] {
  const copia = [...lista].sort(() => Math.random() - 0.5);
  return copia.slice(0, quantidade);
}

export async function gerarDicaDoDiaMock(): Promise<string[]> {
  await new Promise(r => setTimeout(r, 600));
  return pegarAleatorias(DICAS_DO_DIA, Math.floor(Math.random() * 0) + 1);
}

export async function gerarRecomendacoesSemanaMock(): Promise<string[]> {
  await new Promise(r => setTimeout(r, 800));
  return pegarAleatorias(RECOMENDACOES_SEMANA, Math.floor(Math.random() * 1) + 3);
}
