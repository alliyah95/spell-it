import React, { useState, useContext } from "react";
import { BsArrowClockwise, BsVolumeUpFill } from "react-icons/bs";
import { GameContext } from "../../store/game";
import Spinner from "../UI/Spinner";

const VoicePlayer: React.FC<{ onStart: () => void }> = ({ onStart }) => {
    const [hideStartBtn, setHideStartBtn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const game = useContext(GameContext);

    const gameStartHandler = async (): Promise<void> => {
        onStart();
        setHideStartBtn(true);
        setIsLoading(true);
        game.newWord();
    };

    const replayHandler = (): void => {
        game.playWord();
    };

    return (
        <div className="voice-player">
            {!hideStartBtn && (
                <button
                    onClick={gameStartHandler}
                    className="font-bold text-2xl"
                >
                    start
                </button>
            )}

            {hideStartBtn &&
                isLoading &&
                !game.speaking &&
                !game.wordPlayed && <Spinner />}

            {hideStartBtn && game.speaking && (
                <BsVolumeUpFill className="text-3xl" />
            )}

            {hideStartBtn && game.wordPlayed && !game.speaking && (
                <button onClick={replayHandler} className="text-3xl">
                    <BsArrowClockwise />
                </button>
            )}
        </div>
    );
};

export default VoicePlayer;
