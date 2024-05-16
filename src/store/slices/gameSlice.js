/* eslint-disable no-param-reassign */
import { createSlice, current } from "@reduxjs/toolkit";

const defaultState = {
  inProgress: false,
  users: [],
  phase: null,
  phaseCount: 0,
  rolesetOptions: [],
  selectedRoleset: null,
  leader: null,
  views: {},
  gameOverDetails: null,
  error: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState: defaultState,
  reducers: {
    // actions
    setGameInProgress: (state) => {
      state.inProgress = true;
    },
    resetGame: () => defaultState,
    setUsers: (state, action) => {
      state.users = action.payload.users || [];
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
      console.log("changing phase details", action.payload);
      state.phase = action.payload.phase;
      state.phaseCount = action.payload.count;
      state.inProgress = true;
    },
    setUserTallies: (state, action) => {
      const newData = action.payload.list || [];
      const updatedUsers = newData.map((user) => {
        const { id, name } = user.player;
        const { votes } = user;
        return {
          id,
          name,
          votes,
        };
      });
      state.users = updatedUsers;
    },
    addView: (state, action) => {
      console.log({ action });
      const { Player, Attribute, Role, GamePhase, Hit } = action.payload;
      console.log({ Player, Attribute, Role, GamePhase, Hit, state });
      const currState = current(state);
      console.log({ currState });
      // game phase already exists
      if (currState.views[`${GamePhase}`]) {
        state.views[`${GamePhase}`].push({ Player, Attribute, Role, Hit });
      }
      // game phase doesn't exist yet
      else {
        state.views[`${GamePhase}`] = [{ Player, Attribute, Role, Hit }];
      }
    },
    setGameOver: (state, action) => {
      state.gameOverDetails = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
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
  setUserTallies,
  addView,
  setGameOver,
  setError,
} = gameSlice.actions;

export default gameSlice.reducer;
