const questions = [
    // Categoria: Pop
    {
        question: "Quem é conhecido como o 'Rei do Pop'?",
        options: ["Elvis Presley", "Michael Jackson", "Freddie Mercury"],
        correct: 1,
    },
    {
        question: "Qual é o nome verdadeiro da cantora Beyoncé?",
        options: ["Beyoncé Knowles", "Alicia Keys", "Rihanna"],
        correct: 0,
    },
    {
        question: "Qual banda fez o hit 'Bohemian Rhapsody'?",
        options: ["The Beatles", "Queen", "The Rolling Stones"],
        correct: 1,
    },
    {
        question: "Em que ano o álbum 'Thriller' de Michael Jackson foi lançado?",
        options: ["1982", "1990", "1978"],
        correct: 0,
    },
    {
        question: "Quem foi o criador da banda 'The Beatles'?",
        options: ["John Lennon", "Paul McCartney", "George Harrison"],
        correct: 0,
    },

    // Categoria: Novela Brasileira
    {
        question: "Em qual novela global apareceu o personagem 'Carminha'?",
        options: ["Avenida Brasil", "Salve Jorge", "O Clone"],
        correct: 0,
    },
    {
        question: "Quem interpretou o personagem 'Damião' em 'Roque Santeiro'?",
        options: ["Chico Anysio", "Tony Ramos", "Zé Vicente de Paula"],
        correct: 1,
    },
    {
        question: "Em que ano foi exibida a novela 'Pantanal'?",
        options: ["1990", "1987", "2021"],
        correct: 0,
    },
    {
        question: "Qual é o nome da novela que fez sucesso com o personagem 'Jeca Tatu'?",
        options: ["A Moreninha", "O Canto da Sereia", "O Rei do Gado"],
        correct: 2,
    },
    {
        question: "Qual novela foi a primeira a ser transmitida no horário nobre pela Globo?",
        options: ["O Bem-Amado", "Baila Comigo", "Roque Santeiro"],
        correct: 0,
    },

    // Categoria: Artistas Brasileiros
    {
        question: "Quem é o autor da música 'Garota de Ipanema'?",
        options: ["Caetano Veloso", "Vinícius de Moraes", "Gilberto Gil"],
        correct: 1,
    },
    {
        question: "Qual é o nome verdadeiro de Ivete Sangalo?",
        options: ["Ivana da Silva", "Ivete Lúcia", "Ivete Maria"],
        correct: 0,
    },
    {
        question: "Em que cidade nasceu Roberto Carlos?",
        options: ["Rio de Janeiro", "Espírito Santo", "São Paulo"],
        correct: 1,
    },
    {
        question: "Quem é conhecido como o 'Rei do Baião'?",
        options: ["Luiz Gonzaga", "Chico Buarque", "Gilberto Gil"],
        correct: 0,
    },
    {
        question: "Qual é o nome completo da cantora Anitta?",
        options: ["Larissa de Macedo Machado", "Maria Anitta", "Anita Ferreira"],
        correct: 0,
    },

    // Categoria: Cultura Brasileira
    {
        question: "Qual é o prato típico brasileiro feito com feijão e arroz?",
        options: ["Feijoada", "Cuscuz", "Churrasco"],
        correct: 0,
    },
    {
        question: "Qual o nome do famoso prato nordestino feito com milho?",
        options: ["Cuscuz", "Acarajé", "Moqueca"],
        correct: 0,
    },
    {
        question: "Onde nasceu o famoso escritor Machado de Assis?",
        options: ["São Paulo", "Rio de Janeiro", "Minas Gerais"],
        correct: 1,
    },
    {
        question: "Quem é o autor da obra 'Dom Casmurro'?",
        options: ["José de Alencar", "Machado de Assis", "Jorge Amado"],
        correct: 1,
    },
    {
        question: "Qual é o nome da cidade famosa pelo carnaval e pelo samba no Rio de Janeiro?",
        options: ["São João de Meriti", "Rio de Janeiro", "Santos"],
        correct: 1,
    },

    // Categoria: História Brasileira
    {
        question: "Quem foi o primeiro imperador do Brasil?",
        options: ["Dom Pedro I", "Dom João VI", "Getúlio Vargas"],
        correct: 0,
    },
    {
        question: "Em que ano o Brasil proclamou sua independência?",
        options: ["1822", "1889", "1500"],
        correct: 0,
    },
    {
        question: "Quem foi o primeiro presidente do Brasil?",
        options: ["Getúlio Vargas", "Marechal Deodoro da Fonseca", "Juscelino Kubitschek"],
        correct: 1,
    },
    {
        question: "Quem foi o líder do movimento abolicionista no Brasil?",
        options: ["Zumbi dos Palmares", "José do Patrocínio", "Tiradentes"],
        correct: 1,
    },
    {
        question: "Em que cidade foi assinado o tratado de Tordesilhas?",
        options: ["Lisboa", "Madri", "Roma"],
        correct: 1,
    },

    // Categoria: Cinema Brasileiro
    {
        question: "Quem ganhou o Oscar de Melhor Diretor por 'Cidade de Deus'?",
        options: ["Fernando Meirelles", "Nelson Pereira dos Santos", "José Padilha"],
        correct: 0,
    },
    {
        question: "Qual ator brasileiro foi protagonista do filme 'O Palhaço'?",
        options: ["Selton Mello", "Wagner Moura", "Lázaro Ramos"],
        correct: 0,
    },
    {
        question: "Quem dirigiu o filme 'Central do Brasil'?",
        options: ["Walter Salles", "Fernando Meirelles", "José Padilha"],
        correct: 0,
    },
    {
        question: "Qual é o nome da atriz que interpretou Dona Flor em 'Dona Flor e Seus Dois Maridos'?",
        options: ["Sônia Braga", "Glória Pires", "Fernanda Montenegro"],
        correct: 0,
    },
    {
        question: "Qual filme brasileiro foi indicado ao Oscar de Melhor Filme Estrangeiro em 2003?",
        options: ["Cidade de Deus", "Central do Brasil", "O Pagador de Promessas"],
        correct: 0,
    },

    // Categoria: Geografia Brasileira
    {
        question: "Qual é a maior cidade do Brasil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília"],
        correct: 0,
    },
    {
        question: "Qual é o maior estado brasileiro em termos de área?",
        options: ["Amazonas", "Minas Gerais", "Bahia"],
        correct: 0,
    },
    {
        question: "Qual cidade é conhecida como 'A Capital Nacional do Frevo'?",
        options: ["Recife", "Salvador", "Fortaleza"],
        correct: 0,
    },
    {
        question: "Em que estado brasileiro está localizada a Chapada Diamantina?",
        options: ["Minas Gerais", "Bahia", "Goías"],
        correct: 1,
    },
    {
        question: "Qual é o maior rio do Brasil?",
        options: ["Rio São Francisco", "Rio Paraná", "Rio Amazonas"],
        correct: 2,
    },

    // Categoria: Ciência
    {
        question: "Quem é o responsável pela teoria da relatividade?",
        options: ["Isaac Newton", "Albert Einstein", "Galileu Galilei"],
        correct: 1,
    },
    {
        question: "Qual é o nome do planeta mais próximo do Sol?",
        options: ["Vênus", "Mercúrio", "Marte"],
        correct: 1,
    },
    {
        question: "Quem inventou a lâmpada elétrica?",
        options: ["Nikola Tesla", "Thomas Edison", "Alexander Graham Bell"],
        correct: 1,
    },
    {
        question: "Qual é a fórmula química da água?",
        options: ["H2O", "CO2", "O2"],
        correct: 0,
    },
    {
        question: "Qual é o principal gás responsável pelo efeito estufa?",
        options: ["Oxigênio", "Dióxido de carbono", "Nitrato"],
        correct: 1,
    },

    // Mais questões podem ser adicionadas de diversas categorias conforme desejado.
];

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
};

// Embaralha as questões
shuffleArray(questions);

export default questions;
