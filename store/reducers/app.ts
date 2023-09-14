import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface appState {
  url: string;
  searchEngine: string;
}

const initialState: appState = {
  url: "",
  searchEngine: "Bing"
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    openUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setSearchEngine: (state, action: PayloadAction<string>) => {
      state.searchEngine = action.payload;
    },
  },
});

export const { openUrl, setSearchEngine } = app.actions;

export default app.reducer;