import React, { useContext } from "react";
import { HighestScoreContext } from "../../store";

const Header: React.FC = () => {
    const highestScore = useContext(HighestScoreContext);

    return <p>Highest score: {highestScore.value}</p>;
};

export default Header;
