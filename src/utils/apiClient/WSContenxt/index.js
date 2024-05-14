import { useEffect, createContext, useRef, useMemo, useState } from "react";
import config from "@constants/config";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../../store/slices/userSlice";
import { setUsers } from "../../../store/slices/gameSlice";

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
      let data;
      try {
        data = JSON.parse(e.data);
      } catch (error) {
        console.error("error parsing received message:", error);
      }
      console.log("message received:", { data });
      setSocketMessage(JSON.parse(e.data));
      switch (data.messageType) {
        case "idSet":
          dispatch(setUserId({ id: data.payload }));
          break;
        case "playerJoin":
          console.log("A player joined!");
          // TODO: some other stuff
          break;
        case "alivePlayerList":
          dispatch(setUsers({ users: data.payload }));
          break;
        case "rolesList":
          break;
        default:
          break;
      }
    };
    socket.onSetUserName = (userName) => {
      console.log("setting username on server to:", userName);
      socket.send(
        JSON.stringify({
          messageType: "setName",
          playerName: userName,
        })
      );
    };
    socket.connect = () => {
      console.log("connecting user to server");
      socket.send(JSON.stringify({ messageType: "connect" }));
    };
    socket.leave = () => {
      console.log("removing user from server");
      socket.send(JSON.stringify({ messageType: "quit" }));
      dispatch(setUserId({ id: null }));
    };
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
