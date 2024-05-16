import "@scss/loseScreen.scss";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function LoseScreen() {
  const { role } = useSelector(({ user }) => user.localUser);
  const msg = useMemo(() => (!role.alive ? "You are dead" : "Evil has won"), [role]);

  return (
    <div className="lose-screen">
      <h3 className="lose">{msg}</h3>
    </div>
  );
}
