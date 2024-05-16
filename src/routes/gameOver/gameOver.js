import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoseScreen from "@components/LoseScreen";
import WinScreen from "@components/WinScreen";
import Tally from "../voting/tally";

export default function GameOver() {
  const navigate = useNavigate();
  const { users: allUserData } = useSelector(({ game }) => game);

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

  console.log({ gameOverDetails });

  const WinOrLoseScreen = gameOverDetails && winningTeam === "Good" ? WinScreen : LoseScreen;

  return (
    <div className="gameOver">
      <WinOrLoseScreen>
        {
          // TODO: put in the final details
        }
      </WinOrLoseScreen>
    </div>
  );
}
