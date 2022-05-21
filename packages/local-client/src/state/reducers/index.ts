import { configureStore } from "@reduxjs/toolkit";
import bundleSlice from "./bundleReducers";
import cellsSlice from "./cellReducers";
import thunk from "redux-thunk";
import { persistMiddleware } from "../middleware/persist-middleware";
const store = configureStore({
  reducer: {
    cells: cellsSlice.reducer,
    bundle: bundleSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).prepend(persistMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
