import { configureStore } from "@reduxjs/toolkit";
import bundleSlice, { bundleSliceActions } from "./bundleReducers";
import { AnyAction } from "redux";
import cellsSlice, { cellsSliceActions } from "./cellReducers";
import thunk from "redux-thunk";
import { ThunkAction } from "@reduxjs/toolkit";
import { bundler } from "../../bundler";
import axios from "axios";
import { Cell } from "../cell";
const store = configureStore({
  reducer: {
    cells: cellsSlice.reducer,
    bundle: bundleSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const createBundle = (
  cellId: string,
  input: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(bundleSliceActions.bundleStart({ cellId }));

    const result = await bundler(input);
    dispatch(bundleSliceActions.bundleComplete({ cellId, bundle: result }));
  };
};

export const fetchCells = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    dispatch(cellsSliceActions.fetchCells());
    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch(cellsSliceActions.fetchCellsComplete(data));
    } catch (err: any) {
      dispatch(cellsSliceActions.fetchCellsError(err.message));
    }
  };
};

export const saveCells = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const { data, order } = getState().cells;
    const cells = order.map((id) => data[id]);
    try {
      await axios.post("/cells", { cells });
    } catch (err: any) {
      dispatch(cellsSliceActions.saveCellsError(err.message));
    }
  };
};

// store.dispatch({
//   type: "cells/insertCellBefore",
//   payload: {
//     id: null,
//     type: "code",
//   },
// });

store.dispatch(cellsSliceActions.insertCellAfter({ id: null, type: "code" }));
store.dispatch(cellsSliceActions.insertCellAfter({ id: null, type: "text" }));
store.dispatch(cellsSliceActions.insertCellAfter({ id: null, type: "code" }));

// console.log(store.getState());
