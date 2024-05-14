/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  localUser: {
    name: null,
  },
  remoteUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    setupUser: (state, action) => {
      state.localUser.name = action.payload.name;
    },
    clearSession: (state) => {
      state.localUser = defaultState.localUser;
    },
  },
});

export const { setupUser, clearSession } = userSlice.actions;

export default userSlice.reducer;
