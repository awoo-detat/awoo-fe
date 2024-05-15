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
      state.leader = action.payload;
    },
    changePhaseDetails: (state, action) => {
      state.phase = action.payload.phase;
      state.phaseCount = action.payload.phaseCount;
      state.inProgress = true;
    },
  },
});

export const {
  setGameInProgress,
  resetGame,
  setUsers,
  setRoles,
  setSelectedRoleset,
  setLeader,
  changePhaseDetails,
} = gameSlice.actions;

export default gameSlice.reducer;
