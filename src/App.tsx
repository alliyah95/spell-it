import React from "react";
import Header from "./components/Header";
import Title from "./components/Title";
import Input from "./components/Input";
import CurrentScore from "./components/CurrentScore";
import VoicePlayer from "./components/VoicePlayer";

const App: React.FC = () => {
    return (
        <div className="bg-white-300 dark:bg-dark-blue-300">
            <div className="w-[85%] mx-auto h-screen text-dark-blue-300 dark:text-white-300 flex flex-col justify-center">
                <header>
                    <Header />
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
