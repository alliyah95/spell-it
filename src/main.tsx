import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GameProvider, ThemeProvider, HighestScoreProvider } from "./store";

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
