import Diurnal from "@routes/diurnal/diurnal.js";
import "@scss/desk.scss";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function Desk() {
  const { phase } = useSelector(({ game }) => game);

  const isDay = useMemo(() => {
    return phase === 'day';
  }, [phase]);

  return (
    <div
      className="desk"
      style={{
        backgroundImage: `url("${require(`../../assets/village-${isDay ? "day" : "night"}.jpg`)}")`,
      }}
    >
      <Diurnal
        isDay={isDay}
      />
    </div>
  );
}
