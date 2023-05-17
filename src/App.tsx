import React, { useState } from "react";
import {
    Input,
    VoicePlayer,
    CurrentScore,
    HighestScore,
    Status,
    ThemeToggleButton,
    Title,
} from "./components/index";

const App: React.FC = () => {
    const [status, setStatus] = useState<string>("Type your answers here 👇");
    const [statusKey, setStatusKey] = useState<number>(0);
    const [animate, setAnimate] = useState<boolean>(false);

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

    return (
        <div className="bg-white-300 dark:bg-dark-blue-300">
            <div className="w-[85%] mx-auto h-screen text-dark-blue-300 dark:text-white-300 flex flex-col justify-center">
                <header>
                    <HighestScore />
                    <ThemeToggleButton />
                </header>
                <main>
                    <Title />
                    <CurrentScore />
                    <VoicePlayer onStart={startHandler} />
                    <Status
                        text={status}
                        index={statusKey}
                        animate={animate}
                        key={statusKey}
                    />
                    <Input onCheck={statusHandler} />
                </main>
                <footer>
                    <p>Made with 💙 by Alliyah Joyce Sarip</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
