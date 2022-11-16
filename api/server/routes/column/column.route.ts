import * as columnModel from "./column.model";
import express, { Express, Router, Request, Response } from "express";
import { Board } from "@prisma/client";

export const router: Router = express.Router();

router.post("/column", async (request: Request, response: Response) => {
  const { boardId, name, tasks } = request.body;
  if (!boardId) response.status(500).json({ message: "boardId is required" });
  console.log(request.body);
  try {
    const board = await columnModel.addColumn(boardId, name, tasks);
    response.status(200).json(board);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "could not add column", error });
  }
});

router.put("/column", async (request: Request, response: Response) => {
  const { id, name, column } = request.body;

  if (!id || !name)
    return response
      .status(500)
      .json({ message: "id and name are required to delete column" });
  console.log(request.body);
  if (!column)
    return response
      .status(500)
      .json({ message: "updated column is required in body" });
  console.log(request.body);
  try {
    const updatedColumn = await columnModel.updateColumn(id, name, column);
    response.status(200).json(updatedColumn);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "could not update column", error });
  }
});

router.delete("/column", async (request: Request, response: Response) => {
  const { id, name } = request.body;

  if (!id || !name)
    return response
      .status(500)
      .json({ message: "id and name are required to delete column" });

  try {
    const column = await columnModel.removeColumn(id, name);
    response.status(200).json(column);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "could not delete column", error });
  }
});
