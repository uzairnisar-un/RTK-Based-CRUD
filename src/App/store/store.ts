import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../service/PostApi.js";
import themeReducer from "../redux/slices/themeSlice.js";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
