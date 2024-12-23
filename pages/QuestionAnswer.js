import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true });

export async function main() {
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "aaaaaaa");
}

export async function getGroqChatCompletion() {

    // Array com os temas disponíveis
    const themes = [
        "Geografia",
        // "Artes e Cultura Geral",
        "Esportes",
        "Cinema e TV, filmes e séries",
        "Curiosidades",
        "Música"
    ];

    // Função para escolher um tema aleatório
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                
                content: `Você é um criador de perguntas de múltipla escolha no estilo "Show do Milhão". Sua única tarefa é gerar perguntas em português do Brasil, relacionadas ao tema "${randomTheme}", com nível de dificuldade fácil ou médio, no formato JSON descrito abaixo. As perguntas devem ser simples, objetivas e claras, com opções de resposta curtas (máximo de 3 palavras), diretas e não óbvias. Apenas uma resposta deve ser correta. Responda **somente** com o conteúdo dentro das chaves, sem qualquer texto adicional.  

Formato de saída:  
{question: '...', options: ['opção 0', 'opção 1', 'opção 2'], correct: 0}  
 `

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

    let questionData = JSON.parse(formattedText);

    // Embaralhando as opções de resposta
    const options = questionData.options;
    const correctAnswer = options[questionData.correct]; // Resposta correta antes de embaralhar

    // Função para embaralhar as opções
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
        }
    }

    // Embaralha as opções
    shuffleArray(options);

    // Atualiza o índice da resposta correta com base no novo índice das opções
    questionData.correct = options.indexOf(correctAnswer);

    return questionData;
}

const QuestionAnswer = () => {
    return <div>Question Answer Page</div>;
};

export default QuestionAnswer;
