import React, { useState, useEffect } from "react";

type Theme = {
    mode: string;
    toggleTheme: () => void;
};

export const ThemeContext = React.createContext<Theme>({
    mode: "",
    toggleTheme: () => undefined,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = (
    props
) => {
    // initially use the browser's current theme
    const [mode, setMode] = useState<string>(
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
    );

    // upate theme based on the state variable
    useEffect(() => {
        document.body.classList.toggle("dark", mode === "dark");
    }, [mode]);

    const themeHandler = () => {
        setMode(mode === "dark" ? "light" : "dark");
    };

    const themeContextValue: Theme = {
        mode: mode,
        toggleTheme: themeHandler,
    };

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
