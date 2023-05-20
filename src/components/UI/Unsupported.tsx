import React from "react";

const Unsupported: React.FC = () => {
    return (
        <p className="text-center text-white-400 bg-blue-300 rounded-md p-4">
            Oh no! Your browser or device is currently not supported by the app
            😔. In the meantime, you can check out my other works{" "}
            <a className="underline" href="https://github.com/alliyah95">
                here
            </a>
            !
        </p>
    );
};

export default Unsupported;
