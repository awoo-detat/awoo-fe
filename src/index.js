import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "@store";
import Desk from "@routes/desk/desk.js";
import Home from "@routes/home/home.js";
import { PersistGate } from "redux-persist/integration/react";
import { WebSocketProvider } from "@utils/apiClient/WSContenxt";
import WinScreen from "@components/WinScreen";
import LoseScreen from "@components/LoseScreen";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/desk",
    element: <Desk />,
  },
  {
    path: "/win",
    element: <WinScreen />,
  },
  {
    path: "/lose",
    element: <LoseScreen />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WebSocketProvider>
          <RouterProvider router={router} />
        </WebSocketProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
