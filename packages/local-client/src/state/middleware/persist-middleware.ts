import { combineReducers, Middleware } from "redux";
import { saveCells } from "../reducers";
import bundleSlice from "../reducers/bundleReducers";
import cellsSlice, { cellsSliceActions } from "../reducers/cellReducers";

const rootReducer = combineReducers({
  cells: cellsSlice.reducer,
  bundle: bundleSlice.reducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const persistMiddleware: Middleware<{}, RootState> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);
    if (
      [
        cellsSliceActions.deleteCell.type,
        cellsSliceActions.updateCell.type,
        cellsSliceActions.moveCell.type,
        cellsSliceActions.insertCellAfter.type,
      ].includes(action.type)
    ) {
      saveCells()(dispatch, getState, action);
    }
  };
