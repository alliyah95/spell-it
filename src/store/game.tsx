import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import axios from "axios";
import { generateRandomNum } from "../utils/game";

type Settings = {
    wordLength: [number, number];
    voiceIndex: number;
    speed: number;
};

type Setting = {
    [settingType: string]: number | number[];
};

type Game = {
    score: number;
    word: string;
    wordPlayed: boolean;
    speaking: boolean;
    gameStarted: boolean;
    voices: SpeechSynthesisVoice[];
    loading: boolean;
    settings: Settings;
    supported: boolean;
    error: boolean;
    startGame: () => void;
    newWord: () => void;
    playWord: () => void;
    pass: () => void;
    checkAnswer: (answer: string) => boolean;
    modifySettings: (setting: Setting) => void;
};

export const GameContext = React.createContext<Game>({
    score: 0,
    word: "",
    wordPlayed: false,
    speaking: false,
    gameStarted: false,
    voices: [],
    loading: false,
    settings: { wordLength: [4, 10], voiceIndex: 0, speed: 1 },
    supported: true,
    error: false,
    startGame: () => undefined,
    newWord: () => undefined,
    playWord: () => undefined,
    pass: () => undefined,
    checkAnswer: () => true,
    modifySettings: () => undefined,
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = (
    props
) => {
    const [word, setWord] = useState<string>("");
    const [wordPlayed, setWordPlayed] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [settings, setSettings] = useState<Settings>(() => {
        const storedSettings = localStorage.getItem("settings");
        return storedSettings
            ? JSON.parse(storedSettings)
            : {
                  wordLength: [4, 10],
                  voiceIndex: 0,
                  speed: 1,
              };
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const { speak, speaking, supported, voices } = useSpeechSynthesis();

    const newWordHandler = async (): Promise<void> => {
        const length = generateRandomNum(
            settings.wordLength[0],
            settings.wordLength[1]
        );

        try {
            const response = await axios.get(
                `https://random-word-api.herokuapp.com/word?length=${length}`
            );
            const data = response.data;
            setWord(data[0]);
        } catch (error) {
            setError(true);
        }
    };

    const playHandler = (): void => {
        if (!word) return;

        speak({
            text: word,
            rate: settings.speed,
            voice: voices[settings.voiceIndex],
        });

        if (word) {
            setWordPlayed(true);
        }
    };

    // whenever the word changes, automatically play it
    useEffect(() => {
        playHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const settingsHandler = (setting: Setting): void => {
        const [settingType, value] = Object.entries(setting)[0];
        setSettings((currentSettings) => {
            const newSettings = { ...currentSettings, [settingType]: value };
            localStorage.setItem("settings", JSON.stringify(newSettings));
            return newSettings;
        });
    };

    const passHandler = (): void => {
        setWord("");
    };

    const gameContextvalue: Game = {
        score,
        word,
        wordPlayed,
        speaking,
        gameStarted,
        voices,
        loading,
        settings,
        supported,
        error,
        startGame: gameStartHandler,
        newWord: newWordHandler,
        playWord: playHandler,
        pass: passHandler,
        checkAnswer: answerHandler,
        modifySettings: settingsHandler,
    };

    return (
        <GameContext.Provider value={gameContextvalue}>
            {props.children}
        </GameContext.Provider>
    );
};

export default GameProvider;
