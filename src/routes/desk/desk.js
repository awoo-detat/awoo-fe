import Diurnal from "@routes/diurnal/diurnal.js";
import "@scss/desk.scss";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Desk() {
  const navigate = useNavigate();
  const { phase } = useSelector(({ game }) => game);

  const isDay = useMemo(() => phase === "day", [phase]);

  // if (!phase || phase < 1) {
  //   navigate("/home");
  // }

  return (
    <div
      className="desk"
      style={{
        // eslint-disable-next-line import/no-dynamic-require, global-require
        backgroundImage: `url("${require(`../../assets/village-${isDay ? "day" : "night"}.jpg`)}")`,
      }}
    >
      <Diurnal isDay={isDay} />
    </div>
  );
}
