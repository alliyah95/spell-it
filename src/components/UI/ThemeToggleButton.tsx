import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../store";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";

const ThemeToggleButton: React.FC = () => {
    const themeCtx = useContext(ThemeContext);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const themeHandler = () => {
        setIsTransitioning(true);
        themeCtx.toggleTheme();
    };

    useEffect(() => {
        const transitionTimeout = setTimeout(() => {
            setIsTransitioning(false);
        }, 300);

        return () => {
            clearTimeout(transitionTimeout);
        };
    }, [themeCtx.mode]);

    return (
        <button className="cursor-pointer" onClick={themeHandler}>
            <div
                className={`transition-colors ${
                    isTransitioning ? "duration-300" : ""
                }`}
            >
                {themeCtx.mode === "light" ? (
                    <BsFillSunFill className="h-8" />
                ) : (
                    <BsMoonFill className="h-8" />
                )}
            </div>
        </button>
    );
};

export default ThemeToggleButton;
