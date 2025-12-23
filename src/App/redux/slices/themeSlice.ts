import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemeState } from "../../types/post.types.js";
const savedMode =
  (localStorage.getItem("themeMode") as "light" | "dark") || "light";

const initialState: ThemeState = {
  mode: savedMode || "light",
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode == "light" ? "dark" : "light";
      localStorage.setItem("themeMode", state.mode);
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.mode = action.payload;
      localStorage.setItem("themeMode", state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
