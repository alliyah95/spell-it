import React, { useState, useEffect } from "react";

const Status: React.FC<{
    text: string;
    index: number;
    animate: boolean;
}> = ({ text, index, animate }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (animate) {
            setIsVisible(true);

            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [index, animate]);

    return (
        <div className="mb-2 text-center">
            <h3
                className={`mb-2 font-bold text-xl text-center fade-in ${
                    !isVisible ? "fade-out" : ""
                }`}
            >
                {text}
            </h3>
        </div>
    );
};

export default Status;
