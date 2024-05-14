/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  inProgress: false,
  users: [],
  rolesetOptions: [],
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
    setRoles: (state, action) => {
      state.rolesetOptions = action.payload.rolesetOptions;
    },
  },
});

export const { startGame, resetGame, setUsers, setRoles } = gameSlice.actions;

export default gameSlice.reducer;
