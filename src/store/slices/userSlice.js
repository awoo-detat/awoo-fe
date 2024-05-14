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
    setUserName: (state, action) => {
      state.localUser.name = action.payload.name;
    },
    setUserId: (state, action) => {
      state.localUser.id = action.payload.id;
    },
    clearSession: (state) => {
      state.localUser = defaultState.localUser;
    },
  },
});

export const { setUserName, clearSession, setUserId } = userSlice.actions;

export default userSlice.reducer;
