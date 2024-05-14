/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  name: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    setupUser: (state, action) => {
      console.log("Setting up user", action.payload);
      state.name = action.payload.name;
    },
    clearSession: () => defaultState,
  },
});

export const { setupUser, clearSession } = userSlice.actions;

export default userSlice.reducer;
