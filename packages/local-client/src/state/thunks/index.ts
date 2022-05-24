import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../reducers";
import { AnyAction } from "redux";
import { cellsSliceActions } from "../reducers/cellReducers";
import { Cell } from "../cell";
import axios from "axios";
import { bundleSliceActions } from "../reducers/bundleReducers";
import { bundler } from "../../bundler";
import { defaultCell } from "../default-cells";

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
      if (data.length === 0) {
        dispatch(cellsSliceActions.fetchCellsComplete(defaultCell));
      } else {
        dispatch(cellsSliceActions.fetchCellsComplete(data));
      }
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
