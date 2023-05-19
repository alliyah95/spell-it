import React, { useContext, useRef, useEffect } from "react";
import { GameContext } from "../../store/game";
import { HighestScoreContext } from "../../store/highest-score";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Input: React.FC<{ onCheck: (text: string) => void }> = ({ onCheck }) => {
    const answerRef = useRef<HTMLInputElement | null>(null);
    const game = useContext(GameContext);
    const highestScore = useContext(HighestScoreContext);

    useEffect(() => {
        if (game.score > highestScore.value) {
            highestScore.setNewHighestScore(game.score);
        }
    }, [game.score, highestScore.value]);

    const checkHandler = (evt: React.FormEvent): void => {
        evt.preventDefault();

        if (answerRef.current && game.gameStarted) {
            const isCorrect = game.checkAnswer(answerRef.current.value);
            answerRef.current.value = "";
            answerRef.current.focus();

            if (isCorrect) {
                onCheck("Correct!");
                setTimeout(() => {
                    game.newWord();
                }, 1000);
            } else {
                onCheck("Incorrect!");
            }
        }
    };

    const passHandler = (): void => {
        if (game.gameStarted) {
            answerRef.current!.value = "";
            answerRef.current?.focus();
            onCheck("The correct answer was " + game.word);
            setTimeout(() => {
                game.newWord();
            }, 1000);
        }
    };

    return (
        <form className="w-full max-w-lg mx-auto" onSubmit={checkHandler}>
            <input
                type="text"
                className={`answer-input ${
                    !game.gameStarted ? "cursor-not-allowed" : ""
                }`}
                id="answer-input"
                ref={answerRef}
                data-tooltip-id="answer-input"
                data-tooltip-content="Start first!"
                data-tooltip-place="top"
                readOnly={!game.gameStarted}
            />
            <div className="btn-wrapper">
                <button
                    id="pass-btn"
                    className={`btn btn--dark-blue ${
                        !game.gameStarted || !game.word
                            ? "cursor-not-allowed"
                            : ""
                    }`}
                    type="button"
                    data-tooltip-id="pass-btn"
                    data-tooltip-content="Start first!"
                    data-tooltip-place="top"
                    onClick={passHandler}
                    disabled={!game.word}
                >
                    Pass
                </button>

                <button
                    id="check-btn"
                    className={`btn btn--blue ${
                        !game.gameStarted || !game.word
                            ? "cursor-not-allowed"
                            : ""
                    }`}
                    type="submit"
                    data-tooltip-id="check-btn"
                    data-tooltip-content="Start first!"
                    data-tooltip-place="top"
                    onClick={checkHandler}
                >
                    Check
                </button>

                {!game.gameStarted && (
                    <>
                        {["pass-btn", "check-btn", "answer-input"].map((id) => (
                            <Tooltip
                                key={id}
                                id={id}
                                className="bg-dark-blue-400 dark:bg-white-300 dark:text-dark-blue-400 opacity-100"
                            />
                        ))}
                    </>
                )}
            </div>
        </form>
    );
};

export default Input;
