import React, { useState, useContext } from "react";
import { GameContext } from "./store/game";
import {
    Input,
    Settings,
    VoicePlayer,
    CurrentScore,
    HighestScore,
    Status,
    ThemeToggleButton,
    Title,
    Unsupported,
} from "./components/index";

const App: React.FC = () => {
    const [status, setStatus] = useState<string>("Type your answers here 👇");
    const [statusKey, setStatusKey] = useState<number>(0);
    const [animate, setAnimate] = useState<boolean>(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const game = useContext(GameContext);

    const updateStatus = (): void => {
        setStatusKey(statusKey + 1);
        setAnimate(true);
    };

    const statusHandler = (text: string): void => {
        setStatus(text);
        updateStatus();
    };

    const startHandler = (): void => {
        setStatus("");
        updateStatus();
    };

    const settingsHandler = () => {
        setShowSettings(false);
    };

    return (
        <div className="w-[85%] mx-auto min-h-screen text-dark-blue-300 dark:text-white-300 flex flex-col justify-center">
            {showSettings && <Settings closeHandler={settingsHandler} />}
            <header>
                <HighestScore />
                <ThemeToggleButton />
            </header>
            <main>
                <Title />
                {!game.supported && <Unsupported />}
                {game.supported && (
                    <>
                        <CurrentScore />
                        <VoicePlayer onStart={startHandler} />
                        <Status
                            text={status}
                            index={statusKey}
                            animate={animate}
                            key={statusKey}
                        />
                        <Input onCheck={statusHandler} />
                    </>
                )}
            </main>
            <footer>
                {game.supported && (
                    <button
                        className="underline mb-8 hover:text-blue-300"
                        onClick={() => {
                            setShowSettings(true);
                        }}
                    >
                        Settings
                    </button>
                )}

                <p>
                    Made with 💙 by{" "}
                    <a
                        href="https://github.com/alliyah95"
                        target="_blank"
                        className="dev-info"
                    >
                        Alliyah Joyce Sarip
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default App;
