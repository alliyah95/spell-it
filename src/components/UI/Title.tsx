import React from "react";

const Title: React.FC = () => {
    return (
        <div className="text-center mb-10">
            <h1 className="font-black text-5xl lg:text-6xl mb-2">
                spell <span className="text-blue-300">it</span>
            </h1>
            <p>Say goodbye to misspelled words.</p>
        </div>
    );
};

export default Title;
