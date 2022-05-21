import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import bundleSlice, { bundleSliceActions } from "./bundleReducers";
import { AnyAction } from "redux";
import cellsSlice, { cellsSliceActions } from "./cellReducers";
import thunk from "redux-thunk";
import { ThunkAction } from "@reduxjs/toolkit";
import { bundler } from "../../bundler";
import axios from "axios";
import { Cell } from "../cell";
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
    dispatch(cellsSliceActions.fetchCellsStart());
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
  return async (dispatch, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells = order.map((id) => data[id]);
    try {
      await axios.post("/cells", { cells });
    } catch (err: any) {
      dispatch(cellsSliceActions.saveCellsError(err.message));
    }
  };
};
