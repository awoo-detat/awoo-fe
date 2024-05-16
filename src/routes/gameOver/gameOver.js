import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoseScreen from "@components/LoseScreen";
import WinScreen from "@components/WinScreen";

export default function GameOver() {
  const navigate = useNavigate();

  const { gameOverDetails } = useSelector(({ game }) => game);
  const { winner: winningTeam } = gameOverDetails || {};

  useEffect(() => {
    if (!gameOverDetails) {
      navigate("/game");
    }
  }, [navigate, gameOverDetails]);

  if (!gameOverDetails) {
    return null;
  }

  return (
    <div className="gameOver">
      {gameOverDetails && winningTeam === "Good" ? <WinScreen /> : <LoseScreen />}
    </div>
  );
}
