import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AppDispatch } from "../state";
import { cellsSliceActions } from "../state";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useCellActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(
    () => bindActionCreators(cellsSliceActions, dispatch),
    [dispatch]
  );
};
