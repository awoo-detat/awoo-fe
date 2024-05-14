import { useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getTodosTestAPI } from "./store/awoo-client/api";

function App() {
  const handleClick = useCallback(async () => {
    const response = await getTodosTestAPI();
    console.log({ response });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick}>Click me to test the api</button>
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
