import Diurnal from "@routes/diurnal/diurnal.js";
import "@scss/desk.scss";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function Desk() {
  const { phase } = useSelector(({ game }) => game);

  const isDay = false; // useMemo(() => phase === "day", [phase]);

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
