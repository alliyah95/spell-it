import React from "react";
import {
    Input,
    VoicePlayer,
    CurrentScore,
    HighestScore,
    ThemeToggleButton,
    Title,
} from "./components/index";

const App: React.FC = () => {
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
                    <VoicePlayer />
                    <Input />
                </main>
                <footer>
                    <p>Made with 💙 by Alliyah Joyce Sarip</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
