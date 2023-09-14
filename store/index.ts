import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import app from "./reducers/app";

const reducers = {
  app: app,
};

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
