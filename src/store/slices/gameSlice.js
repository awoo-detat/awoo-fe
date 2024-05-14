/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  inProgress: false,
  users: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState: defaultState,
  reducers: {
    startGame: (state) => {
      state.inProgress = true;
    },
    resetGame: () => defaultState,
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
  },
});

export const { startGame, resetGame, setUsers } = gameSlice.actions;

export default gameSlice.reducer;
