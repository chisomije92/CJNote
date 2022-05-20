import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BundleStartActionModel,
  BundleCompleteActionModel,
} from "../action-models";

interface BundleState {
  [key: string]:
    | {
        loading: boolean;
        err: string;
        code: string;
      }
    | undefined;
}

const initialState: BundleState = {};

const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {
    bundleStart(
      state: BundleState,
      action: PayloadAction<BundleStartActionModel>
    ) {
      state[action.payload.cellId] = {
        loading: true,
        err: "",
        code: "",
      };
      return state;
    },
    bundleComplete(
      state: BundleState,
      action: PayloadAction<BundleCompleteActionModel>
    ) {
      state[action.payload.cellId] = {
        loading: false,
        err: action.payload.bundle.err,
        code: action.payload.bundle.code,
      };
      return state;
    },
  },
});

export default bundleSlice;

export const bundleSliceActions = bundleSlice.actions;
