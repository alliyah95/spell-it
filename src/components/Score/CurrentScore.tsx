import React, { useContext } from "react";
import { GameContext } from "../../store/game";

const CurrentScore: React.FC = () => {
    const gameContext = useContext(GameContext);

    return (
        <h2 className="font-bold text-xl underline">
            Current score: {gameContext.score}
        </h2>
    );
};

export default CurrentScore;
