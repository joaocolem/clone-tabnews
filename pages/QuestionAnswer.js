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
        "Geografia do Brasil",
        // "Artes e Cultura Geral",
        "Esportes",
        "Cinema e TV, filmes e séries",
        "Curiosidades",
        "Música brasileira"
    ];

    // Função para escolher um tema aleatório
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                
                content: `Você é um criador de perguntas de múltipla escolha no estilo "Show do Milhão". Sua tarefa é gerar perguntas **interessantes, e acessíveis** em português do Brasil, relacionadas ao tema "${randomTheme}". As perguntas devem ter nível de dificuldade **fácil ou médio**, sendo adequadas para um público familiar de todas as idades, incluindo crianças. As perguntas devem ser de **cultura geral** mas **não devem ser extremamente óbvias**.

As perguntas devem ser **claras, objetivas e envolventes**, com opções de resposta curtas (máximo de 3 palavras) e **equilibradas**, ou seja, cada uma deve parecer plausível, exigindo que o jogador pense um pouco antes de escolher, sem ser trivial. Evite perguntas simples demais ou com respostas tão evidentes que qualquer um acertaria sem pensar. As alternativas de resposta devem ser **relevantes e plausíveis**, de modo que o jogador tenha que considerar cuidadosamente antes de escolher.

**Exemplo bom de pergunta**:  
{question: 'Qual é a maior cidade do Brasil?', options: ['São Paulo', 'Rio de Janeiro', 'Brasília'], correct: 0}

**Exemplo ruim de pergunta**:  
{question: 'Qual é a cor do céu?', options: ['Azul', 'Verde', 'Amarelo'], correct: 0}

Formato de saída:
{question: '...', options: ['opção 0', 'opção 1', 'opção 2'], correct: 0}

**Não envie** nada além do conteúdo dentro das chaves.  


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
