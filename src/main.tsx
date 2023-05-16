import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ThemeProvider from "./store/theme.tsx";
import GameProvider from "./store/game.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ThemeProvider>
        <GameProvider>
            <App />
        </GameProvider>
    </ThemeProvider>
);
