import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import axios from "axios";

type Game = {
    score: number;
    word: string;
    wordPlayed: boolean;
    speaking: boolean;
    newWord: () => void;
    playWord: () => void;
    checkAnswer: (answer: string) => boolean;
};

export const GameContext = React.createContext<Game>({
    score: 0,
    word: "",
    wordPlayed: false,
    speaking: false,
    newWord: () => {},
    playWord: () => {},
    checkAnswer: () => true,
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = (
    props
) => {
    const [word, setWord] = useState<string>("");
    const [wordPlayed, setWordPlayed] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const { speak, voices, speaking } = useSpeechSynthesis();

    // TODO
    // 1. handle error state
    // 2. change length of word according to user preference
    const newWordHandler = async (): Promise<void> => {
        try {
            const response = await axios.get(
                "https://random-word-api.herokuapp.com/word?length=10"
            );
            const data = response.data;
            setWord(data[0]);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const playHandler = (): void => {
        speak({
            text: word,
            rate: 0.8,
        });

        if (word) {
            setWordPlayed(true);
        }
    };

    // whenever the word changes, automatically play it
    useEffect(() => {
        playHandler();
    }, [word]);

    const answerHandler = (answer: string): boolean => {
        if (answer.toLowerCase().trim() === word.toLowerCase().trim()) {
            setScore(score + 1);
            alert("correct!");
            return true;
        }
        alert("wrong!");
        return false;
    };

    const gameContextvalue: Game = {
        score,
        word,
        wordPlayed,
        speaking,
        newWord: newWordHandler,
        playWord: playHandler,
        checkAnswer: answerHandler,
    };

    return (
        <GameContext.Provider value={gameContextvalue}>
            {props.children}
        </GameContext.Provider>
    );
};

export default GameProvider;
