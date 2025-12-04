// export async function gerarDicasIA(dados: any) {
// const API_KEY ="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";

//   const prompt = `
// Você é um assistente de saúde. Com base nos dados abaixo, gere:

// 1) UMA dica do dia — curta, direta e motivacional.
// 2) TRÊS recomendações úteis para a semana.

// Sempre responda em JSON no formato:

// {
//   "dicaDoDia": "texto...",
//   "recomendacoes": ["...", "...", "..."]
// }

// Dados do usuário:
// ${JSON.stringify(dados)}
// `;

//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 300,
//     }),
//   });

//   const json = await response.json();

//   try {
//     return JSON.parse(json.choices[0].message.content);
//   } catch {
//     return {
//       dicaDoDia: "Mantenha a consistência! Pequenos passos importam.",
//       recomendacoes: [
//         "Hidrate-se ao longo do dia.",
//         "Faça pequenas pausas para relaxamento.",
//         "Durma em horários regulares."
//       ]
//     };
//   }
// }
