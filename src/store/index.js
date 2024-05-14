import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@slices/counterSlice";
import userReducer from "@slices/userSlice";
import gameReducer from "@slices/gameSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    game: gameReducer,
  },
});
