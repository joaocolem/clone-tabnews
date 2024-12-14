import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true });

export async function main() {
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "aaaaaaa");
}

export async function getGroqChatCompletion(theme = "Ciências") {

    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Elabore uma pergunta de múltipla escolha em português, com nível de dificuldade variado (fácil, médio ou difícil), relacionada ao tema "${theme}", incluindo a pergunta, três opções de resposta e o índice da opção correta (iniciado em 0). A pergunta deve ser relacionada à cultura brasileira ou conhecimentos gerais e a resposta deve estar no formato: {question: '...', options: [...], correct: 0}, eu quero apenas o que está dentro de {} e não quero nada além disso.`,
            },
        ],
        model: "llama3-8b-8192",
    });

    const rawText = response.choices[0]?.message?.content || '{}';

    console.log(rawText);
    // Ajustando o texto para ser um JSON válido
    const formattedText = rawText
        .replace(/(\w+):/g, '"$1":') // Adiciona aspas às chaves
        .replace(/'/g, '"'); // Substitui aspas simples por duplas, se necessário

    const questionData = JSON.parse(formattedText);
    return questionData;
}


