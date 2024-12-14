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
        const getRandomSound = (soundArray) => {
            const randomIndex = Math.floor(Math.random() * soundArray.length);
            return new Audio(soundArray[randomIndex]);
        };

        setCorrectSound(getRandomSound(sons.correctSounds));
        setIncorrectSound(getRandomSound(sons.incorrectSounds));

        const handleKeyPress = (event) => {
            if (!activeTeam) {
                if (event.key === "1") {
                    handleTeamPress("biscoitos");
                } else if (event.key === "2") {
                    handleTeamPress("renas");
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);

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
                setCurrentQuestion(questionData);
            } else {
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error("Erro ao buscar a pergunta:", error);
            setShowErrorModal(true);
        }
    };

    useEffect(() => {
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

    const teamColors = {
        biscoitos: "#FF5722",
        renas: "#3F51B5",
    };

    return (
        <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            <h1>Time Quiz</h1>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
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
                    }}
                >
                    <h2>Time Biscoitos</h2>
                    <p style={{ fontSize: "32px", fontWeight: "bold" }}>{teamScores.biscoitos}</p>
                </div>

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
                    }}
                >
                    <h2>Time Renas</h2>
                    <p style={{ fontSize: "32px", fontWeight: "bold" }}>{teamScores.renas}</p>
                </div>
            </div>

            <div>
                <h2>{currentQuestion?.question}</h2>

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
                        width: "300px",
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
                        }}
                    >
                        Próxima
                    </button>
                </div>
            )}

            {!activeTeam && (
                <div style={{ marginTop: "30px" }}>
                    <h3>Escolha o time para começar!</h3>
                    <button
                        onClick={() => handleTeamPress("biscoitos")}
                        style={{
                            padding: "10px 20px",
                            fontSize: "18px",
                            backgroundColor: "#FF5722",
                            color: "white",
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
                            backgroundColor: "#3F51B5",
                            color: "white",
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

export default TeamQuiz;
