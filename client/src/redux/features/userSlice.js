import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStarted: state => {
      state.loading = true;
      state.error = null;
    },
    authSuccessful: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    authFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: state => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { authStarted, authSuccessful, authFailed, logoutSuccess } =
  userSlice.actions;

export default userSlice.reducer;
