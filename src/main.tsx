import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ThemeProvider from "./store/theme.tsx";
import GameProvider from "./store/game.tsx";
import HighestScoreProvider from "./store/highest-score.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ThemeProvider>
        <HighestScoreProvider>
            <GameProvider>
                <App />
            </GameProvider>
        </HighestScoreProvider>
    </ThemeProvider>
);
