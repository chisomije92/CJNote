import { configureStore } from "@reduxjs/toolkit";
import bundleSlice, { bundleSliceActions } from "./bundleReducers";
import { AnyAction } from "redux";
import cellsSlice, { cellsSliceActions } from "./cellReducers";
import thunk from "redux-thunk";
import { ThunkAction } from "@reduxjs/toolkit";
import { bundler } from "../../bundler";

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

// console.log(createBundle("1", ""));
// store.dispatch(createBundle("1", ""));

// export const createBundle = (
//   cellId: string,
//   input: string
// ): ThunkAction<void, RootState, unknown, AnyAction> => {
//   return async (dispatch) => {
//     dispatch(bundleSliceActions.bundleStart({ cellId }));
//     const result = await bundler(input);
//     dispatch(bundleSliceActions.bundleComplete({ cellId, bundle: result }));
//   };
// };

// store.dispatch({
//   type: "cells/insertCellBefore",
//   payload: {
//     id: null,
//     type: "code",
//   },
// });

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
