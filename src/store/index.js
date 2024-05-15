import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "@slices/counterSlice";
import userReducer from "@slices/userSlice";
import gameReducer from "@slices/gameSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

// TODO: don't persist the game slice

const appReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  game: gameReducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [thunk],
});

export const persistor = persistStore(store);
