import React from "react";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
    return (
        <p className="text-center text-white-400 bg-blue-300 rounded-md p-4 max-w-lg">
            {message} In the meantime, you can check out my other works{" "}
            <a className="underline" href="https://github.com/alliyah95">
                here
            </a>
            !
        </p>
    );
};

export default ErrorMessage;
