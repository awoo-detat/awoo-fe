import { useEffect, createContext, useRef, useMemo, useState } from "react";
import config from "@constants/config";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../../store/slices/userSlice";

const WebSocketContext = createContext();

function WebSocketProvider({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [socketMessage, setSocketMessage] = useState(null);
  const ws = useRef(null);
  const dispatch = useDispatch();
  const { id } = useSelector(({ user }) => user.localUser);

  useEffect(() => {
    /* WS initialization and cleanup */
    const socket = new WebSocket(`${config.baseUrl}?id=${id}`);
    ws.current = socket;
    socket.onopen = (e) => {
      console.log("WS open", e);
      setIsReady(true);
    };
    socket.onclose = (e) => {
      console.log("WS close", e);
      setIsReady(false);
    };
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setSocketMessage(JSON.parse(e.data));
      switch (data.messageType) {
        case "idSet":
          dispatch(setUserId({ id: data.payload }));
          break;
        default:
          console.log({ data });
          break;
      }
    };
    socket.onSetUserName = (userName) => {
      console.log("setting username on server to:", userName);
      socket.send(
        JSON.stringify({
          type: "setName",
          playerName: userName,
        })
      );
    };
    console.log("ws.current:", socket);
    return () => {
      socket.close();
    };
  }, []);

  const providerVal = useMemo(() => [isReady, socketMessage, ws.current], [isReady, socketMessage]);

  /* WS provider dom */
  /* subscribe and unsubscribe are the only required prop for the context */
  return <WebSocketContext.Provider value={providerVal}>{children}</WebSocketContext.Provider>;
}

export { WebSocketContext, WebSocketProvider };
