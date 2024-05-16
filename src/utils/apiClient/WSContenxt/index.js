import { useEffect, createContext, useRef, useMemo, useState, useCallback } from "react";
import config from "@constants/config";
import { useDispatch, useSelector } from "react-redux";
import { setUserId, setUserName, setUserRole, killPlayer } from "@store/slices/userSlice";
import {
  setRoles,
  setSelectedRoleset,
  setUsers,
  setLeader,
  changePhaseDetails,
  setUserTallies,
  addView,
  setGameOver,
} from "@store/slices/gameSlice";
import { useNavigate } from "react-router-dom";

const WebSocketContext = createContext();

function WebSocketProvider({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [socketMessage, setSocketMessage] = useState(null);
  const ws = useRef(null);
  const dispatch = useDispatch();
  const { id } = useSelector(({ user }) => user.localUser);
  const [pressedPlay, setPressedPlay] = useState(false);
  const handlePressPlay = useCallback(() => {
    setPressedPlay(true);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (pressedPlay || (!pressedPlay && id)) {
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
          case "nameSet":
            console.log("name set on server");
            dispatch(setUserName({ name: data.payload }));
            break;
          case "playerJoin":
            console.log("A player joined!");
            break;
          case "alivePlayerList":
            dispatch(setUsers({ users: data.payload }));
            break;
          case "rolesetList": {
            const rolesetOptions = Object.keys(data.payload)?.map((role) => ({
              ...data.payload[role],
            }));
            dispatch(setRoles({ rolesetOptions }));
            break;
          }
          case "rolesetSelected":
            console.log("roleset selected:", data.payload);
            dispatch(setSelectedRoleset(data.payload));
            break;
          case "roleAssigned":
            console.log("assigned role:", data.payload);
            dispatch(setUserRole(data.payload));
            break;
          case "leaderSet":
            dispatch(setLeader(data.payload));
            break;
          case "phaseChanged":
            dispatch(changePhaseDetails(data.payload));
            break;
          case "tallyChanged":
            dispatch(setUserTallies(data.payload));
            break;
          case "playerKilled":
            dispatch(killPlayer());
            break;
          case "view":
            dispatch(addView(data.payload));
            break;
          case "gameOver":
            console.log("game over");
            dispatch(setGameOver(data.payload));
            navigate("/gameover");
            break;
          case "error":
            console.error("error received from server:", data.payload);
            break;
          // TODO: name set message
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
      socket.leave = () => {
        console.log("removing user from server");
        socket.send(JSON.stringify({ messageType: "quit" }));
        dispatch(setUserId({ id: null }));
      };
      socket.setRoleset = (rolesetName) => {
        console.log("setting roleset on server to:", rolesetName);
        socket.send(
          JSON.stringify({
            messageType: "setRoleset",
            roleset: rolesetName,
          })
        );
      };
      socket.setGameInProgress = () => {
        console.log("starting game");
        socket.send(JSON.stringify({ messageType: "start" }));
      };
      socket.submitVote = (userId) => {
        console.log("submitting vote:", userId);
        socket.send(JSON.stringify({ messageType: "vote", target: userId }));
      };
      socket.submitNightAction = (targetId) => {
        console.log("submitting night action:", targetId);
        socket.send(JSON.stringify({ messageType: "nightAction", target: targetId }));
      };
      return () => {
        socket.close();
      };
    }
  }, [pressedPlay, dispatch, navigate]); // do not add id to this dep array

  const providerVal = useMemo(
    () => [isReady, socketMessage, ws.current, handlePressPlay],
    [handlePressPlay, isReady, socketMessage]
  );

  /* WS provider dom */
  /* subscribe and unsubscribe are the only required prop for the context */
  return <WebSocketContext.Provider value={providerVal}>{children}</WebSocketContext.Provider>;
}

export { WebSocketContext, WebSocketProvider };
