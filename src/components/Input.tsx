import React, { useContext, useRef } from "react";
import { GameContext } from "../store/game";

const Input: React.FC = () => {
    const answerRef = useRef<HTMLInputElement | null>(null);
    const game = useContext(GameContext);

    const submitHandler = (evt: React.FormEvent): void => {
        evt.preventDefault();
        if (answerRef.current) {
            const isCorrect = game.checkAnswer(answerRef.current.value);
            answerRef.current.value = "";

            if (isCorrect) {
                game.newWord();
            }
        }
    };

    const passHandler = (): void => {
        alert("The correct answer was " + game.word);
        game.newWord();
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
