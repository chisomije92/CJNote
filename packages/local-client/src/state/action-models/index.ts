import { CellType } from "../cell";

export type Direction = "up" | "down";

export interface MoveCellActionModel {
  id: string;
  direction: Direction;
}

export interface InsertCellAfterActionModel {
  id: string | null;
  type: CellType;
}

export interface UpdateCellActionModel {
  id: string;
  content: string;
}

export interface BundleStartActionModel {
  cellId: string;
}

export interface BundleCompleteActionModel {
  cellId: string;
  bundle: {
    code: string;
    err: string;
  };
}
