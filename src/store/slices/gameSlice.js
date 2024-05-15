/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  inProgress: false,
  users: [],
  rolesetOptions: [],
  selectedRoleset: null,
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
    setSelectedRoleset: (state, action) => {
      state.selectedRoleset = action.payload;
    },
  },
});

export const { startGame, resetGame, setUsers, setRoles, setSelectedRoleset } = gameSlice.actions;

export default gameSlice.reducer;
