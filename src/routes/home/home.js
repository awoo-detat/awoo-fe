import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { clearSession, setUserName } from "@slices/userSlice";
import { resetGame, startGame } from "@store/slices/gameSlice";
import { WebSocketContext } from "@utils/apiClient/WSContenxt";
import WebsocketStausIndicator from "@components/WebsocketStatusIndicator";

export default function Home() {
  const { name, id } = useSelector(({ user }) => user.localUser);
  const { inProgress, users, rolesetOptions } = useSelector(({ game }) => game);
  const [userName, setUserNameFromInput] = useState(name);
  const dispatch = useDispatch();
  const [isReady, socketMessage, ws] = useContext(WebSocketContext);
  console.log({ name, id, users, rolesetOptions });

  const handleUpdateUser = useCallback(() => {
    dispatch(setUserName({ name: userName }));
    ws.onSetUserName(userName);
  }, [dispatch, userName, ws]);

  const handleClearUser = useCallback(() => {
    dispatch(clearSession());
    setUserNameFromInput("");
  }, [dispatch]);

  const handleStartGame = useCallback(() => {
    dispatch(startGame(true));
  }, [dispatch]);

  const handleResetGame = useCallback(() => {
    dispatch(resetGame());
  }, [dispatch]);

  const handleDisconnect = useCallback(() => {
    ws.leave();
  }, [ws]);

  const handleConnect = useCallback(() => {
    ws.connect();
  }, [ws]);

  useEffect(() => {
    console.log({ isReady, socketMessage, ws });
  }, [isReady, socketMessage, ws]);

  return (
    <div className="App">
      <header className="App-header">
        <WebsocketStausIndicator>
          <div id="content-wrapper">
            {!inProgress && (
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserNameFromInput(e.target.value)}
              />
            )}
            {name && <h3>Hi {name}!</h3>}
            {!name && (
              <button type="button" onClick={handleUpdateUser}>
                Click me to connect a user
              </button>
            )}
            {name && (
              <button type="button" onClick={handleUpdateUser}>
                Click me to update user name
              </button>
            )}
            {name && (
              <button type="button" onClick={handleClearUser}>
                Click me to reset the user
              </button>
            )}
            {!inProgress && name && (
              <button type="button" onClick={handleStartGame}>
                Click me to start the game
              </button>
            )}
            {inProgress && (
              <button type="button" onClick={handleResetGame}>
                Click me to reset the game
              </button>
            )}
            {isReady && (
              <button type="button" onClick={handleDisconnect}>
                Click me to disconnect from the WS
              </button>
            )}
            {!isReady && (
              <button type="button" onClick={handleConnect}>
                Click me to connect to the WS
              </button>
            )}
            {users.length && users.map((user) => <p key={user.id}>{user.name}</p>)}
          </div>
        </WebsocketStausIndicator>
      </header>
    </div>
  );
}
