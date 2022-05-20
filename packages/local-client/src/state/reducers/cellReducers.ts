import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InsertCellBeforeActionModel,
  MoveCellActionModel,
  UpdateCellActionModel,
} from "../action-models";
import { Cell } from "../cell";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    moveCell(state: CellState, action: PayloadAction<MoveCellActionModel>) {
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;
    },
    insertCellAfter(
      state: CellState,
      action: PayloadAction<InsertCellBeforeActionModel>
    ) {
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );
      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
      return state;
    },
    updateCell(state: CellState, action: PayloadAction<UpdateCellActionModel>) {
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    },
    deleteCell(state: CellState, action: PayloadAction<string>) {
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;
    },
  },
});

export default cellsSlice;

export const cellsSliceActions = cellsSlice.actions;

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};
