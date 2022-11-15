import type { Board, Column, Task } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addColumn(
  boardId: Board["id"],
  name: Column["name"],
  tasks?: Task[]
) {
  if (tasks) {
    return prisma.column.create({
      data: {
        boardId,
        name,
        tasks: { create: [...tasks] },
      },
      include: {
        tasks: true, // Include all columns in the returned object
      },
    });
  }
  return prisma.column.create({
    data: {
      boardId,
      name,
    },
    include: {
      tasks: true,
    },
  });
}
