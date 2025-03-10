import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../api";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: {},
      isAuthenticated:false,
      loginLoading: false,
      loginSuccess: false,
      loginError: null,
      registerLoading: false,
      registerError: null,
      registerSuccess: false,
      logoutLoading: false,
      logoutError: null,
      logoutSuccess: false,
    },
    reducers: {
      logout: (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.success = false;
        state.error = null;
        state.loading = false;
      },
    }, 
    extraReducers: (builder) => {
        // login
        builder.addCase(login.pending, (state) => {
          state.loginLoading = true;
          state.loginSuccess = false;
          state.logoutError = null;
          state.user = {};
        });
        builder.addCase(login.fulfilled, (state, action) => {
          state.loginLoading = false;
          state.loginSuccess = true;
          state.logoutError = null;
          state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginLoading = false;
            state.loginSuccess = false;
            state.logoutError = action.payload;
            state.user = {};
        })

        // register
        builder.addCase(register.pending, (state) => {
          state.registerLoading = true;
          state.registerError = null;
          state.registerSuccess = false;
          state.user = {};
        });
        builder.addCase(register.fulfilled, (state, action) => {
          state.registerLoading = false;
          state.registerError = null;
          state.registerSuccess = true;
          state.user = action.payload;
        });
        builder.addCase(register.rejected, (state, action) => {
          state.registerLoading = false;
          state.registerError = action.payload;
          state.registerSuccess = false;
          state.user = {};
        })

        // logout
        builder.addCase(login.pending, (state) => {
            state.logoutLoading = true;
            state.logoutSuccess = false;
            state.logoutError = null;
        });
        builder.addCase(login.fulfilled, (state) => {
            state.logoutLoading = false;
            state.logoutSuccess = true;
            state.logoutError = null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.logoutLoading = false;
            state.logoutSuccess = false;
            state.logoutError = action.payload;
        })
    }
});

export const login = createAsyncThunk("auth/login", async ({ email, password }, thunkAPI) => {
  return await apiRequest('auth/login', 'POST', { email, password }, thunkAPI);
});

export const register = createAsyncThunk("auth/register", async ({ email, username, password }, thunkAPI) => {
  return await apiRequest('auth/register', 'POST', { email, username, password }, thunkAPI)
})



export const { } = authSlice.actions;

