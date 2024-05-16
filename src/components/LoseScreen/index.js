import "@scss/loseScreen.scss";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Tally from "../../routes/voting/tally.js";
import { useNavigate } from "react-router-dom";

export default function LoseScreen() {
  const navigate = useNavigate();
  const { role } = useSelector(({ user }) => user.localUser);
  const { users: allUserData, isGameOver } = useSelector(({ game }) => game);
  const msg = useMemo(() => (!role.alive ? "You are dead" : "Evil has won"), [role]);

  return (
    <div className="lose-screen">
      <h3 className="lose">{msg}</h3>
      {!role.alive ? (
        <Tally allUserData={allUserData} />
      ) : null}
    </div>
  );
}
