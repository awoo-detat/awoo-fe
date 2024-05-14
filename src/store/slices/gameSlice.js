/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  inProgress: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState: defaultState,
  reducers: {
    startGame: (state) => {
      state.inProgress = true;
    },
    resetGame: () => defaultState,
  },
});

export const { startGame, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
