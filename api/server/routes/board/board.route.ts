import * as boardModel from "./board.model";
import express, { Express, Router, Request, Response } from "express";
import { Board, prisma } from "@prisma/client";

export const router: Router = express.Router();

router.get("/board", async (request: Request, response: Response) => {
  const ownerId: Board["ownerId"] = request.body.ownerId;
  if (!ownerId)
    response.status(400).json({ message: "no ownerId found in request body" });

  try {
    const boards: Board[] = await boardModel.getBoards(ownerId);

    response.status(200).json(boards);
  } catch (error) {
    response.status(500).json({ message: "could not get boards", error });
  }
});

router.post("/board", async (request: Request, response: Response) => {
  const { ownerId, name, columns } = request.body;
  try {
    const board = await boardModel.addBoard(ownerId, name, columns);
    response.status(200).json(board);
  } catch (error) {
    response.status(500).json({ message: "could not get boards", error });
  }
});
