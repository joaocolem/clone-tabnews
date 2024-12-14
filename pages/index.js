import React, { useState, useEffect } from "react";
import sons from "../public/sons/sons"; // Importando o arquivo sons.js
import { getGroqChatCompletion } from "./QuestionAnswer"

function TeamQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(null); // Apenas uma pergunta
    const [activeTeam, setActiveTeam] = useState(null);  // Variável para armazenar o time ativo
    const [feedback, setFeedback] = useState("");
    const [teamScores, setTeamScores] = useState({ biscoitos: 0, renas: 0 });
    const [answered, setAnswered] = useState(false);
    const [correctSound, setCorrectSound] = useState(null);
    const [incorrectSound, setIncorrectSound] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [chosenTeam, setChosenTeam] = useState(null); // Estado para armazenar o time escolhido
    const [nextTheme, setNextTheme] = useState(""); // Estado para armazenar o tema da próxima pergunta

    const incrementScore = (team) => {
        setTeamScores((prevScores) => ({
            ...prevScores,
            [team]: prevScores[team] + 1,
        }));
    };

    const decrementScore = (team) => {
        setTeamScores((prevScores) => ({
            ...prevScores,
            [team]: prevScores[team] - 1,
        }));
    };

    useEffect(() => {
        const handleEnterPress = (event) => {
            if (showErrorModal && event.key === "Enter") {
                closeErrorModal();
            }
        };

        window.addEventListener("keydown", handleEnterPress);

        return () => {
            window.removeEventListener("keydown", handleEnterPress);
        };
    }, [showErrorModal]);

    useEffect(() => {
        // Função para escolher um som aleatório
        const getRandomSound = (soundArray) => {
            const randomIndex = Math.floor(Math.random() * soundArray.length);
            return new Audio(soundArray[randomIndex]);
        };

        // Atribuindo sons aleatórios para acerto e erro
        setCorrectSound(getRandomSound(sons.correctSounds));
        setIncorrectSound(getRandomSound(sons.incorrectSounds));

        // Função para capturar teclas pressionadas para seleção do time
        const handleKeyPress = (event) => {
            if (!activeTeam) {
                if (event.key === "1") {
                    handleTeamPress("biscoitos");
                } else if (event.key === "2") {
                    handleTeamPress("renas");
                }
            }
        };

        // Adicionando o ouvinte de evento para capturar a tecla pressionada
        window.addEventListener("keydown", handleKeyPress);

        // Limpeza do ouvinte ao desmontar o componente
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [activeTeam]);

    const tocarSom = () => {
        const audio = new Audio(sons.sounds[0]); // Som de sino
        audio.play();
    };

    const handleTeamPress = (team) => {
        tocarSom();
        if (!activeTeam) {
            setActiveTeam(team);
            setChosenTeam(team);
        }
    };

    const fetchNextQuestion = async (theme = "") => {
        try {
            const questionData = await getGroqChatCompletion(theme); // Passa o tema para a função
            if (questionData?.question && questionData?.options && questionData?.correct !== undefined) {
                setCurrentQuestion(questionData); // Atualiza a questão com a resposta da API
            } else {
                setShowErrorModal(true); // Se os dados não forem válidos, exibe o erro
            }
        } catch (error) {
            console.error("Erro ao buscar a pergunta:", error);
            setShowErrorModal(true); // Exibe o erro se ocorrer algum problema na chamada da API
        }
    };

    useEffect(() => {
        // Quando o componente é montado, chamamos a função para pegar a primeira pergunta
        fetchNextQuestion();
    }, []);

    const handleAnswer = (optionIndex) => {
        if (answered) return;

        const correctIndex = currentQuestion.correct;
        const opposingTeam = activeTeam === "biscoitos" ? "renas" : "biscoitos";

        if (optionIndex === correctIndex) {
            setFeedback(`Correto! Time ${activeTeam.toUpperCase()} marcou ponto!`);
            setTeamScores((prevScores) => ({
                ...prevScores,
                [activeTeam]: prevScores[activeTeam] + 1,
            }));
            setIsCorrect(true);
            correctSound.play();
        } else {
            setFeedback(`Errado! Time ${opposingTeam.toUpperCase()} ganhou o ponto!`);
            setTeamScores((prevScores) => ({
                ...prevScores,
                [opposingTeam]: prevScores[opposingTeam] + 1,
            }));
            setIsCorrect(false);
            incorrectSound.play();
        }

        setAnswered(true);
        setShowErrorModal(true);
    };

    const closeErrorModal = () => {
        setShowErrorModal(false);
        setAnswered(false);
        fetchNextQuestion(nextTheme); // Passa o tema para buscar a próxima pergunta
        setActiveTeam(null);
        setChosenTeam(null);
        setNextTheme(""); // Reseta o tema após uso
    };

    // Definindo as cores de acordo com o time escolhido
    const teamColors = {
        biscoitos: "#FF5722", // Laranja para o time Biscoitos
        renas: "#3F51B5", // Azul para o time Renas
    };

    return (
        <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            <h1>Time Quiz</h1>

            {/* Placar */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
                {/* Time Biscoitos */}
                <div
                    style={{
                        margin: "0 20px",
                        backgroundColor: "#FF5722",
                        color: "white",
                        padding: "15px 30px",
                        borderRadius: "12px",
                        textAlign: "center",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        fontSize: "24px",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
                    }}
                >
                    <h2>Time Biscoitos</h2>
                    <p style={{ fontSize: "32px", fontWeight: "bold" }}>{teamScores.biscoitos}</p>
                    <div>
                        <button
                            onClick={() => incrementScore("biscoitos")}
                            style={buttonStyle}
                        >
                            ↑
                        </button>
                        <button
                            onClick={() => decrementScore("biscoitos")}
                            style={buttonStyleRed}
                        >
                            ↓
                        </button>
                    </div>
                </div>

                {/* Time Renas */}
                <div
                    style={{
                        margin: "0 20px",
                        backgroundColor: "#3F51B5",
                        color: "white",
                        padding: "15px 30px",
                        borderRadius: "12px",
                        textAlign: "center",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        fontSize: "24px",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
                    }}
                >
                    <h2>Time Renas</h2>
                    <p style={{ fontSize: "32px", fontWeight: "bold" }}>{teamScores.renas}</p>
                    <div>
                        <button
                            onClick={() => incrementScore("renas")}
                            style={buttonStyle}
                        >
                            ↑
                        </button>
                        <button
                            onClick={() => decrementScore("renas")}
                            style={buttonStyleRed}
                        >
                            ↓
                        </button>
                    </div>
                </div>

            </div>


            {/* Pergunta */}
            <div>
                <h2>{currentQuestion?.question}</h2>

                {/* Alternativas só aparecem após escolher o time */}
                {activeTeam && currentQuestion && (
                    <div>
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                disabled={answered}
                                style={{
                                    padding: "10px 20px",
                                    margin: "10px",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                    backgroundColor: answered ? "#ccc" : "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de feedback */}
            {showErrorModal && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "30px",
                        backgroundColor: isCorrect ? "#4CAF50" : "#F44336",
                        color: "white",
                        fontSize: "30px",
                        borderRadius: "10px",
                        textAlign: "center",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                        width: "300px",
                        zIndex: 1000,
                    }}
                >
                    <h2>{isCorrect ? "ACERTOU!" : "ERROU!"}</h2>
                    <p>{feedback}</p>
                    <input
                        type="text"
                        placeholder="Tema da próxima pergunta"
                        value={nextTheme}
                        onChange={(e) => setNextTheme(e.target.value)}
                        style={{
                            width: "80%",
                            padding: "10px",
                            margin: "15px 0",
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                        }}
                    />
                    <button
                        onClick={closeErrorModal}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "white",
                            color: isCorrect ? "#4CAF50" : "#F44336",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Próxima
                    </button>
                </div>
            )}

            {/* Seleção do time */}
            {!activeTeam && (
                <div style={{ marginTop: "30px" }}>
                    <h3>Escolha o time para começar!</h3>
                    <button
                        onClick={() => handleTeamPress("biscoitos")}
                        style={{
                            padding: "10px 20px",
                            fontSize: "18px",
                            cursor: "pointer",
                            backgroundColor: "#FF5722",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            marginRight: "20px",
                        }}
                    >
                        Time Biscoitos
                    </button>
                    <button
                        onClick={() => handleTeamPress("renas")}
                        style={{
                            padding: "10px 20px",
                            fontSize: "18px",
                            cursor: "pointer",
                            backgroundColor: "#3F51B5",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                        }}
                    >
                        Time Renas
                    </button>
                </div>
            )}
        </div>
    );
}

const buttonStyle = {
    margin: "0 5px",
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "20px",
    cursor: "pointer",
};

const buttonStyleRed = {
    margin: "0 5px",
    padding: "10px 15px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "20px",
    cursor: "pointer",
};

export default TeamQuiz;
