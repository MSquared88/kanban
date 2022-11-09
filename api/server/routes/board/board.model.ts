import type { Board, Column } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBoards(ownerId: Board["ownerId"]) {
  return prisma.board.findMany({
    where: {
      ownerId,
    },
    include: {
      columns: true, // Igitnclude all columns in the returned object
    },
  });
}

export async function addBoard(
  ownerId: Board["ownerId"],
  name: Board["name"],
  columns?: Column[]
) {
  if (columns) {
    return prisma.board.create({
      data: {
        ownerId,
        name,
        columns: { create: [...columns] },
      },
      include: {
        columns: true, // Include all columns in the returned object
      },
    });
  }

  return prisma.board.create({
    data: {
      ownerId,
      name,
    },
    include: {
      columns: true,
    },
  });
}
