import React, { useState, useEffect } from "react";

type HighestScore = {
    value: number;
    setNewHighestScore: (newValue: number) => void;
};

export const HighestScoreContext = React.createContext<HighestScore>({
    value: 0,
    setNewHighestScore: () => {},
});

export const HighestScoreProvider: React.FC<{ children: React.ReactNode }> = (
    props
) => {
    const [highestScore, setHighestScore] = useState<number>(() => {
        const storedScore = localStorage.getItem("highestScore");
        return storedScore ? parseInt(storedScore, 10) : 0;
    });

    const highestScoreHandler = (newValue: number): void => {
        setHighestScore(newValue);
    };

    useEffect(() => {
        localStorage.setItem("highestScore", highestScore.toString());
    }, [highestScore]);

    const highestScoreObj = {
        value: highestScore,
        setNewHighestScore: highestScoreHandler,
    };

    return (
        <HighestScoreContext.Provider value={highestScoreObj}>
            {props.children}
        </HighestScoreContext.Provider>
    );
};

export default HighestScoreProvider;
