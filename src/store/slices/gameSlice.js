/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  inProgress: false,
  users: [],
  phase: "day",
  phaseCount: 0,
  rolesetOptions: [],
  selectedRoleset: null,
  leader: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    inProgress: false,
    users: [],
    phase: null,
    phaseCount: 0,
    rolesetOptions: [],
    selectedRoleset: null,
  },
  reducers: {
    // actions
    setGameInProgress: (state) => {
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
    setLeader: (state, action) => {
      console.log('action.payload is', action.payload);
      state.leader = action.payload;
    },
  },
});

export const { setGameInProgress, resetGame, setUsers, setRoles, setSelectedRoleset, setLeader } =
  gameSlice.actions;

export default gameSlice.reducer;
