import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../reducers";
import { AnyAction } from "redux";
import { cellsSliceActions } from "../reducers/cellReducers";
import { Cell } from "../cell";
import axios from "axios";
import { bundleSliceActions } from "../reducers/bundleReducers";
import { bundler } from "../../bundler";

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
        console.log("No cells found, creating default cell");
        let defaultCell: Cell[] = [
          {
            content:
              "## CJNote\n\nThis is an interactive coding environment that enables you write Javascript code conveniently. You can also write documentation for the code using markdown. To use, note the following:\n\n1. Click on any cell to edit\n2.  Add new cells by hovering on the divider between each cell\n3.  Variables defined in a code cell can be referred to ou used in another code cell\n4.  Use the built-in **show** function to display any React component, string, number, object etc\n5.  Re-order or delete cells by using the buttons on the top-left\n\nNote that all change made or edits get saved to the file that you opened CJNote with. For example, if you run ***npx cjnote serve test.js***, all the text and code will be saved to the **test.js** file.\n\n\n\n\n\n\n\n\n",
            type: "text",
            id: "9x3gr",
          },
          {
            content:
              "import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}></button>\n      <h3>Count: {count} </h3>\n    </div>\n  );\n};\n\n// Display and varibale or React Component by calling 'show'\nshow(<Counter/>);",
            type: "code",
            id: "sq7p2",
          },
        ];
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
