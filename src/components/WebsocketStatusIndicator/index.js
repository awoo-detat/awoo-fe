import "@scss/websocketStatus.scss";
import { useContext } from "react";
import { WebSocketContext } from "../../utils/apiClient/WSContenxt";

export default function WebsocketStausIndicator({ children }) {
  const [isReady] = useContext(WebSocketContext);

  return (
    <div>
      <h1 id="ws-connection-status" className={!isReady && "disconnected"}>
        {isReady ? "Connected" : "Disconnected"}
      </h1>
      {children}
    </div>
  );
}
