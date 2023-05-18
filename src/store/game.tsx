import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import axios from "axios";

type Settings = {
    wordLength: [number, number];
    voice: number;
    speed: number;
};

type Game = {
    score: number;
    word: string;
    wordPlayed: boolean;
    speaking: boolean;
    gameStarted: boolean;
    loading: boolean;
    settings: Settings;
    startGame: () => void;
    newWord: () => void;
    playWord: () => void;
    checkAnswer: (answer: string) => boolean;
};

export const GameContext = React.createContext<Game>({
    score: 0,
    word: "",
    wordPlayed: false,
    speaking: false,
    gameStarted: false,
    loading: false,
    settings: { wordLength: [3, 10], voice: 0, speed: 0.8 },
    startGame: () => {},
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
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [settings, setSettings] = useState<Settings>({
        wordLength: [4, 10],
        voice: 0,
        speed: 1,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const { speak, speaking } = useSpeechSynthesis();

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
            return true;
        }

        return false;
    };

    const gameStartHandler = (): void => {
        setGameStarted(true);
        setLoading(true);
    };

    const gameContextvalue: Game = {
        score,
        word,
        wordPlayed,
        speaking,
        gameStarted,
        loading,
        settings,
        startGame: gameStartHandler,
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
