import { useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getTodosTestAPI } from "./store/awoo-client/api";
import { increment } from "@slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const count = useSelector(({ counter }) => counter.value);
  const dispatch = useDispatch();
  console.log({ count });

  const handleIncrement = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  const handleAPIClick = useCallback(async () => {
    const response = await getTodosTestAPI();
    console.info({ response });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleIncrement}>Click me to increment</button>
        <p>{count}</p>
        <button onClick={handleAPIClick}>Click me to test the api</button>
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

export default App;
