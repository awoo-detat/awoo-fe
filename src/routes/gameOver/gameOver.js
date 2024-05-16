import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoseScreen from "./components/LoseScreen";
import WinScreen from "./components/WinScreen";

export default function gameOver() {
  const navigate = useNavigate();

  const { gameOver, winningTeam } = useSelector(({ game }) => game);

  useEffect(() => {
    if (!gameOver) {
      navigate("/game");
    }
  }, [navigate, gameOver]);

  return (
    <div
      className="gameOver"
    >
      {gameOver && winningTeam === "Good" ? (
        <WinScreen />
      ) : (
        <LoseScreen />
      )}
    </div>
  );
}
