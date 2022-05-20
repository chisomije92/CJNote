import express from "express";
import fs from "fs/promises";
import path from "path";
interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });

      res.send(JSON.parse(result));
    } catch (err: any) {
      if (err.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", { encoding: "utf-8" });
      } else {
        throw err;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf8");
    res.send({ status: "ok" });
  });

  return router;
};
