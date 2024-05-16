import "@scss/winScreen.scss";

export default function WinScreen({ children }) {
  return (
    <div className="win-screen">
      <h3 className="win">Good wins!</h3>
      {children}
    </div>
  );
}
