import React from "react";

const Input: React.FC = () => {
    return (
        <form className="w-full max-w-lg mx-auto">
            <input type="text" className="answer-input" />
            <div className="btn-wrapper">
                <button className="btn btn--dark-blue" type="button">
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
