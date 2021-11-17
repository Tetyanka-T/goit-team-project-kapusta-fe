import { createSlice } from '@reduxjs/toolkit';
import { authOperations } from '.';

const initialState = {
  name: null,
  email: null,
  token: null,
  isLoggedIn: false,
  isRegistered: false,
  isFetchingCurrentUser: false,
  balance: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, { payload }) {
      state.name = payload.data.userName;
      state.email = payload.data.userEmail;
      state.isRegistered = true;
    },
    [authOperations.register.pending](state) {
      state.name = null;
      state.email = null;
      state.isRegistered = false;
    },
    [authOperations.register.rejected](state) {
      state.name = null;
      state.email = null;
      state.isRegistered = false;
    },
    [authOperations.login.fulfilled](state, { payload }) {
      state.name = payload.data.userName;
      state.email = payload.data.userEmail;
      state.token = payload.data.token;
      state.isLoggedIn = true;
      state.balance = payload.data.balance;
    },
    [authOperations.logout.fulfilled](state) {
      state.name = null;
      state.email = null;
      state.token = null;
      state.isLoggedIn = false;
      state.balance = 0;
    },
    [authOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, { payload }) {
      state.name = payload.data.name;
      state.email = payload.data.email;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
    },
    [authOperations.fetchCurrentUser.rejected](state) {
      state.isFetchingCurrentUser = false;
    },
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
