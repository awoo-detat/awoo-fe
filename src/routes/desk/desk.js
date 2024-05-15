import Diurnal from "@routes/diurnal/diurnal.js";
import "@scss/desk.scss";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function Desk() {
  const { phase, phaseCount } = useSelector(({ game }) => game);
  console.log('phase is', phase); // why undefined???
  console.log('phaseCount is', phaseCount); // it likes this one!! ;_;

  const isDay = useMemo(() => {
    return phase === 'day';
  }, [phase]);

  console.log('isDay is', isDay);

  return (
    <div
      className={'desk'}
      style={{ backgroundImage: `url("${require(`../../assets/village-${isDay ? 'day' : 'night'}.jpg`)}")` }}
    >
      <Diurnal
        isDay={isDay}
      />
    </div>
  );
}
