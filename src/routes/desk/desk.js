import Diurnal from "@routes/diurnal/diurnal.js";
import "@scss/desk.scss";
import { useState } from 'react';

export default function Desk() {
  // todo will come from state
  const [isDay, setIsDay] = useState(true);

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
