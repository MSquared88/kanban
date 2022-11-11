import * as columnModel from "./column.model";
import express, { Express, Router, Request, Response } from "express";
import { Board, prisma } from "@prisma/client";

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
