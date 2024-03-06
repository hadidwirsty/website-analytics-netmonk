import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { userDetails: { username: null, role: null, teamName: null }, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { username, role, teamName, accessToken } = action.payload;
      state.userDetails = { username, role, teamName };
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.userDetails = { username: null, role: null, teamName: null };
      state.token = null;
    }
  }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserDetails = (state) => state.auth.userDetails;
export const selectCurrentToken = (state) => state.auth.token;
