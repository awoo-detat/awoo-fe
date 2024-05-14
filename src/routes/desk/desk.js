import Diurnal from "@routes/diurnal/diurnal.js";
import "@scss/desk.scss";
import woodGrain from '../../assets/brown-wooden-flooring.jpg';
import villageDay from '../../assets/village-day.jpg';
import villageNight from '../../assets/village-night.jpg';

export default function Desk() {
  return (
    <div
      className={'desk'}
      style={{ backgroundImage: "url(" + villageDay + ")" }}
    >
      <Diurnal />
    </div>
  );
}
