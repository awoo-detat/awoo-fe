import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { getTodosTestAPI } from "@store/awoo-client/api";
import { clearSession, setUserName } from "@slices/userSlice";
import { resetGame, startGame } from "../../store/slices/gameSlice";
import { WebSocketContext } from "../../utils/apiClient/WSContenxt";

export default function Home() {
  const { name } = useSelector(({ user }) => user.localUser);
  const { inProgress } = useSelector(({ game }) => game);
  const [userName, setUserNameFromInput] = useState(name);
  const dispatch = useDispatch();
  const [isReady, socketMessage, send] = useContext(WebSocketContext);
  console.log({ name });

  const handleAPIClick = useCallback(async () => {
    const response = await getTodosTestAPI();
    console.info({ response });
  }, []);

  const handleUpdateUser = useCallback(() => {
    dispatch(setUserName({ name: userName }));
  }, [dispatch, userName]);

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

  useEffect(() => {
    console.log({ isReady, socketMessage, send });
  }, [isReady, socketMessage, send]);

  return (
    <div className="App">
      <header className="App-header">
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
        <button type="button" onClick={handleAPIClick}>
          Click me to test the api
        </button>
      </header>
    </div>
  );
}
