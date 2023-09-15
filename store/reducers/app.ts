import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface appState {
  url: string;
  searchEngine: string;
  privateMode: boolean;
  menuIsActive: boolean;
}

const initialState: appState = {
  url: "",
  searchEngine: "Bing",
  privateMode: false,
  menuIsActive: false,
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
    setPrivateMode: (state, action: PayloadAction<boolean>) => {
      state.privateMode = action.payload;
    },
    setMenuActive: (state, action: PayloadAction<boolean>) => {
      state.menuIsActive = action.payload;
    },
  },
});

export const { openUrl, setSearchEngine, setPrivateMode, setMenuActive } =
  app.actions;

export default app.reducer;
