import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { getTodosTestAPI } from "@store/awoo-client/api";
import { clearSession, setupUser } from "@slices/userSlice";

export default function Home() {
  const { name } = useSelector(({ user }) => user.localUser);
  const [userName, setUserName] = useState(name);
  const dispatch = useDispatch();

  const handleAPIClick = useCallback(async () => {
    const response = await getTodosTestAPI();
    console.info({ response });
  }, []);

  const handleUpdateUser = useCallback(() => {
    dispatch(setupUser({ name: userName }));
  }, [dispatch, userName]);

  const handleClearUser = useCallback(() => {
    dispatch(clearSession());
    setUserName("");
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
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
        <button type="button" onClick={handleAPIClick}>
          Click me to test the api
        </button>
      </header>
    </div>
  );
}
