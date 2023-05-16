import React, { useState, useContext } from "react";
import { GameContext } from "../store/game";

const VoicePlayer: React.FC = () => {
    const [hideStartBtn, setHideStartBtn] = useState<boolean>(false);
    const game = useContext(GameContext);

    // start the game
    // this will subsequently hide the start button
    const gameStartHandler = async (): Promise<void> => {
        setHideStartBtn(true);
        game.newWord();
    };

    return (
        <div className="flex justify-center items-center bg-blue-300 w-28 h-28 lg:h-32 lg:w-32 rounded-full mt-6 mb-12">
            {!hideStartBtn && (
                <button
                    onClick={gameStartHandler}
                    className="font-bold text-xl text-white-400"
                >
                    start
                </button>
            )}
        </div>
    );
};

export default VoicePlayer;
