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
        "Matemática básica",
        "Curiosidades"
    ];

    // Função para escolher um tema aleatório
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                
                content: `Elabore uma pergunta de múltipla escolha no estilo "Show do Milhão", com nível de dificuldade fácil ou médio relacionada ao tema "${randomTheme}". As perguntas serão para um jogo a ser jogado em família, com pessoas de todas as idades. A pergunta deve ser formulada em portugues, além disso, a pergunta deve ser simples, objetiva e clara, deve ter opções de resposta diretas e curtas, mas as respostas não devem ser tão óbvias, cada texto da opcao da resposta deve ter no maximo 3 palavras. As respostas devem ser fáceis de entender e relacionadas corretamente a pergunta e ao tema. Certifique-se de que a pergunta tenha a opção correta e que as respostas sejam simples e diretas e que o português brasileiro esteja correto. A pergunta e a resposta devem estar em portugues brasileiro. A resposta deve ser no formato: {question: '...', options: ['opção 0', 'opção 1', 'opção 2'], correct: 0}. Eu quero apenas o que está dentro de {} e não quero nada além disso.`
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
