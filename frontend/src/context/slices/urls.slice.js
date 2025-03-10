import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../api";

export const urlsSlice = createSlice({
    name: "urls",
    initialState: {
      
      userUrls: [],
      userUrlsLoading: false,
      userUrlsSuccess: false,
      userUrlsError: null,
    
      urlsAnalytics: [],
      urlsAnalyticsLoading: false,
      urlsAnalyticsError: null,
      urlsAnalyticsSuccess: false,
    },
    reducers: {
    }, 
    extraReducers: (builder) => {
        // user urls
        builder.addCase(getUserURLs.pending, (state) => {
          state.userUrlsLoading = true;
          state.userUrlsSuccess = false;
          state.userUrlsError = null;
          state.userUrls = [];
        });
        builder.addCase(getUserURLs.fulfilled, (state, action) => {
          state.userUrlsLoading = false;
          state.userUrlsSuccess = true;
          state.userUrlsError = null;
          state.userUrls = action.payload;
        });
        builder.addCase(getUserURLs.rejected, (state, action) => {
            state.userUrlsLoading = false;
            state.userUrlsSuccess = false;
            state.userUrlsError = action.payload;
            state.userUrls = [];
        })

        // user analytics
        builder.addCase(getUserAnalyticsURLs.pending, (state) => {
          state.urlsAnalyticsLoading = true;
          state.urlsAnalyticsError = null;
          state.urlsAnalyticsSuccess = false;
          state.urlsAnalytics = [];
        });
        builder.addCase(getUserAnalyticsURLs.fulfilled, (state, action) => {
          state.urlsAnalyticsLoading = false;
          state.urlsAnalyticsError = null;
          state.urlsAnalyticsSuccess = true;
          state.urlsAnalytics = action.payload;
        });
        builder.addCase(getUserAnalyticsURLs.rejected, (state, action) => {
          state.urlsAnalyticsLoading = false;
          state.urlsAnalyticsError = action.payload;
          state.urlsAnalyticsSuccess = false;
          state.urlsAnalytics = [];
        })
    }
});

export const getUserURLs = createAsyncThunk("user/urls", async (_, thunkAPI) => {
    return await apiRequest(`urls`, "GET", {}, thunkAPI, true);
});

export const getUserAnalyticsURLs = createAsyncThunk("user/analytics", async ({ shortUrl }, thunkAPI) => {
    return await apiRequest(`analytics/${shortUrl}`, "GET", {}, thunkAPI, true);
});




export const { } = urlsSlice.actions;

