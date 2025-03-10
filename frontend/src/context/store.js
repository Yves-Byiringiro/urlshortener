import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice";
import { urlsSlice } from "./slices/urls.slice";




export const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      urls: urlsSlice.reducer,
    },
});