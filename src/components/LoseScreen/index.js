import "@scss/loseScreen.scss";
import { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoseScreen({ children }) {
  const { role } = useSelector(({ user }) => user.localUser);
  const msg = useMemo(() => ((!role?.alive && !gameOverDetails.winner)  ? "You are dead" : "Evil has won"), [role]);
  const {
    phase,
    gameOverDetails,
  } = useSelector(({ game }) => game);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameOverDetails) {
      navigate("/gameover");
    }
    if (!phase) {
      navigate("/");
    }
  }, [navigate, phase, gameOverDetails]);

  return (
    <div className="lose-screen">
      <h3 className="lose">{msg}</h3>
      {children}
    </div>
  );
}
