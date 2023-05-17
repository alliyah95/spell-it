import React, { useContext, useRef } from "react";
import { GameContext } from "../../store/game";

const Input: React.FC<{ onCheck: (text: string) => void }> = ({ onCheck }) => {
    const answerRef = useRef<HTMLInputElement | null>(null);
    const game = useContext(GameContext);

    const submitHandler = (evt: React.FormEvent): void => {
        evt.preventDefault();
        if (answerRef.current) {
            const isCorrect = game.checkAnswer(answerRef.current.value);
            answerRef.current.value = "";

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
        onCheck("The correct answer was " + game.word);
        setTimeout(() => {
            game.newWord();
        }, 1000);
    };

    return (
        <form className="w-full max-w-lg mx-auto" onSubmit={submitHandler}>
            <input type="text" className="answer-input" ref={answerRef} />
            <div className="btn-wrapper">
                <button
                    className="btn btn--dark-blue"
                    type="button"
                    onClick={passHandler}
                >
                    Pass
                </button>
                <button className="btn btn--blue" type="submit">
                    Check
                </button>
            </div>
        </form>
    );
};

export default Input;
