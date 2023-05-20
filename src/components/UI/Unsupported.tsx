import React from "react";

const Unsupported: React.FC = () => {
    return (
        <p className="text-center text-white-400 bg-blue-300 rounded-md p-4">
            Oops! It seems like your browser does not support Speech Synthesis
            😔{" "}
        </p>
    );
};

export default Unsupported;
