/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  localUser: {},
  remoteUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    killPlayer: (state) => {
      state.localUser.alive = false;
    },
    setUserName: (state, action) => {
      state.localUser.name = action.payload.name;
    },
    setUserId: (state, action) => {
      state.localUser.id = action.payload.id;
    },
    setUserRole: (state, action) => {
      console.log("inside setUserRole action");
      state.localUser.role = action.payload;
    },
  },
});

export const { setUserName, setUserId, setUserRole, killPlayer } = userSlice.actions;

export default userSlice.reducer;
