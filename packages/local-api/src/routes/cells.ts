import express from "express";

export const createCellRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.get("/cells", async (req, res) => {});

  router.post("/cells", async (req, res) => {});

  return router;
};
