import React, { useContext, useRef } from "react";
import { GameContext } from "../../store/game";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Button from "../UI/Button";

const Input: React.FC<{ onCheck: (text: string) => void }> = ({ onCheck }) => {
    const answerRef = useRef<HTMLInputElement | null>(null);
    const game = useContext(GameContext);

    const checkHandler = (): void => {
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

    const submitHandler = (evt: React.FormEvent): void => {
        evt.preventDefault();
        checkHandler();
    };

    return (
        <form className="w-full max-w-lg mx-auto" onSubmit={submitHandler}>
            <input type="text" className="answer-input" ref={answerRef} />
            <div className="btn-wrapper">
                <Button
                    id="pass-btn"
                    content="Pass"
                    classes={`btn btn--dark-blue ${
                        !game.gameStarted ? "cursor-not-allowed" : ""
                    }`}
                    tooltipContent="Start first!"
                    tooltipPosition="top"
                    handler={passHandler}
                    kind="button"
                />

                <Button
                    id="check-btn"
                    content="Check"
                    classes={`btn btn--blue ${
                        !game.gameStarted ? "cursor-not-allowed" : ""
                    }`}
                    tooltipContent="Start first!"
                    tooltipPosition="top"
                    handler={checkHandler}
                    kind="submit"
                />

                {!game.gameStarted && (
                    <>
                        {["pass-btn", "check-btn"].map((id) => (
                            <Tooltip
                                key={id}
                                id={id}
                                className="bg-dark-blue-400 dark:bg-white-300 dark:text-dark-blue-400"
                            />
                        ))}
                    </>
                )}
            </div>
        </form>
    );
};

export default Input;
