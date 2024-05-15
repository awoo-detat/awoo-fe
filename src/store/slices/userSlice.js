/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  localUser: {
    name: null,
    id: '00000000-0000-0000-0000-000000000000',
    role: 'Villager',
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
    setUserRole: (state, action) => {
      state.localUser.role = action.payload.role;
    },
    clearSession: (state) => {
      state.localUser = defaultState.localUser;
    },
  },
});

export const { setUserName, clearSession, setUserId, setUserRole } = userSlice.actions;

export default userSlice.reducer;
