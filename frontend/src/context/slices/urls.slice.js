import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqInstance } from "../api";

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

      shortURL: "",
      shortenUrlLoading: false,
      shortenUrlError: null,
      shortenUrlSuccess: false,
    },
    reducers: {
        resetShortenUrlState: (state) => {
            state.shortenUrlLoading = false;
            state.shortenUrlError = null;
            state.shortenUrlSuccess = false;
            state.shortURL = "";
        }
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
          state.userUrls = action.payload?.urls;
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


        // shorten url
        builder.addCase(shortenUrl.pending, (state) => {
            state.shortenUrlLoading = true;
            state.shortenUrlError = null;
            state.shortenUrlSuccess = false;
            state.shortURL = "";
          });
          builder.addCase(shortenUrl.fulfilled, (state, action) => {
            state.shortenUrlLoading = false;
            state.shortenUrlError = null;
            state.shortenUrlSuccess = true;
            state.shortURL = action.payload?.short_url;
          });
          builder.addCase(shortenUrl.rejected, (state, action) => {
            state.shortenUrlLoading = false;
            state.shortenUrlError = action.payload;
            state.shortenUrlSuccess = false;
            state.shortURL = "";
          })
    }
});


export const getUserURLs = createAsyncThunk("user/urls", async (_, thunkAPI) => {
      try {
        const response = await reqInstance.get(`urls`, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens'))?.access}`,
            'Content-Type': 'application/json'
          }
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const getUserAnalyticsURLs = createAsyncThunk("user/analytics", async ({shortUrl}, thunkAPI) => {
    try {
      const response = await reqInstance.get(`analytics/${shortUrl}`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens'))?.access}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const shortenUrl = createAsyncThunk("user/shorten-url", async ({ long_url, title }, thunkAPI) => {
    try {
      const response = await reqInstance.post(`shorten`, {long_url, title}, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens'))?.access}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
});


export const { resetShortenUrlState } = urlsSlice.actions;