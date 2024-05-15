/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  inProgress: false,
  users: [],
  phase: 'day',
  phaseCount: 0,
  rolesetOptions: [],
  selectedRoleset: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState: defaultState,
  reducers: { // actions
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
    updatePhase: (state, action) => {
      state.phase = action.payload.phase;
      state.phaseCount = action.payload.count;
    },
  },
});

export const { startGame, resetGame, setUsers, setRoles, setSelectedRoleset } = gameSlice.actions;

export default gameSlice.reducer;
