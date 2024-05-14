import "@scss/websocketStatus.scss";
import { useContext } from "react";
import { WebSocketContext } from "../../utils/apiClient/WSContenxt";

export default function WebsocketStausIndicator({ children }) {
  const [isReady] = useContext(WebSocketContext);

  return (
    <div>
      <p id="ws-connection-status" className={!isReady && "disconnected"}>
        {isReady ? "Connected" : "Disconnected"}
      </p>
      {children}
    </div>
  );
}
