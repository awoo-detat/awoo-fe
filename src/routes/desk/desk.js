import Diurnal from "@routes/diurnal/diurnal.js";
import "@scss/desk.scss";
import woodGrain from '../../assets/brown-wooden-flooring.jpg';

export default function Desk() {
  return (
    <div
      className={'desk'}
      style={{ backgroundImage: "url(" + woodGrain + ")" }}
    >
      <Diurnal />
    </div>
  );
}
