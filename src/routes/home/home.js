import { useCallback, useState } from "react";
import { increment } from "@slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { getTodosTestAPI } from "@store/awoo-client/api";
import { clearSession, setupUser } from "@slices/userSlice";
import logo from "../../logo.svg";

export default function Home() {
  const { name } = useSelector(({ user }) => user.localUser);
  const [userName, setUserName] = useState(name);
  const count = useSelector(({ counter }) => counter.value);
  const dispatch = useDispatch();

  const handleIncrement = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  const handleAPIClick = useCallback(async () => {
    const response = await getTodosTestAPI();
    console.info({ response });
  }, []);

  const handleAddUser = useCallback(() => {
    dispatch(setupUser({ name: userName }));
  }, [dispatch, userName]);

  const handleClearUser = useCallback(() => {
    dispatch(clearSession());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <button type="button" onClick={handleAddUser}>
          Click me to connect a user
        </button>
        <button type="button" onClick={handleClearUser}>
          Click me to reset the user
        </button>
        <button type="button" onClick={handleIncrement}>
          Click me to increment
        </button>
        <p>{count}</p>
        <button type="button" onClick={handleAPIClick}>
          Click me to test the api
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
