import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../api";
import { reqInstance } from "../api";

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
        logoutState: (state) => {
        state.isAuthenticated = false;
        state.user = {};
        state.loginSuccess = false;
        state.loginError = null;
        state.loginLoading = false;
        localStorage.removeItem("authTokens");
        return state;
      },
    }, 
    extraReducers: (builder) => {
        // login
        builder.addCase(login.pending, (state) => {
          state.loginLoading = true;
          state.loginSuccess = false;
          state.logoutError = null;
          state.user = {};
          state.isAuthenticated = false;
        });
        builder.addCase(login.fulfilled, (state, action) => {
          state.loginLoading = false;
          state.loginSuccess = true;
          state.logoutError = null;
          state.user = action.payload?.user;
          state.isAuthenticated = true;

        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginLoading = false;
            state.loginSuccess = false;
            state.logoutError = action.payload?.error;
            state.user = {};
            state.isAuthenticated = false;

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
          state.user = action.payload?.user;
        });
        builder.addCase(register.rejected, (state, action) => {
          state.registerLoading = false;
          state.registerError = action.payload;
          state.registerSuccess = false;
          state.user = {};
        })

        // logout
        builder.addCase(logout.pending, (state) => {
            state.logoutLoading = true;
            state.logoutSuccess = false;
            state.logoutError = null;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.logoutLoading = false;
            state.logoutSuccess = true;
            state.logoutError = null;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.logoutLoading = false;
            state.logoutSuccess = false;
            state.logoutError = action.payload;
        })
    }
});


export const login = createAsyncThunk("auth/login", async ({ email, password  }, thunkAPI) => {
    try {
      const response = await reqInstance.post(`auth/login`, {email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const auth = response.data;
      console.log(auth)
      const authTokens = {
        access: auth?.tokens?.access,
        refresh: auth?.tokens?.refresh
      }
      localStorage.setItem("authTokens", JSON.stringify(authTokens));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
});

export const register = createAsyncThunk("auth/register", async ({ email, username, password  }, thunkAPI) => {
    try {
      const response = await reqInstance.post(`auth/register`, { email, username, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const auth = response.data;
      const authTokens = {
        access: auth?.tokens?.access,
        refresh: auth?.tokens?.refresh
      }
      localStorage.setItem("authTokens", JSON.stringify(authTokens));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
});


export const logout = createAsyncThunk("auth/logout", async ({ refreshToken }, thunkAPI) => {
    return await apiRequest('auth/login', 'POST', { refreshToken }, thunkAPI);
  });


export const { logoutState } = authSlice.actions;






     