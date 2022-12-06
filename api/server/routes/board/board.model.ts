import type {Board, Column, Task, Subtask, PrismaPromise} from '@prisma/client'

import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function getBoards(userId: Board['userId']) {
  return prisma.board.findMany({
    where: {
      userId,
    },
  })
}

export async function addBoard(
  userId: Board['userId'],
  name: Board['name'],
  columns?: Column[],
) {
  if (columns) {
    return prisma.board.create({
      data: {
        userId,
        name,
        columns: {create: [...columns]},
      },
      include: {
        columns: true, // Include all columns in the returned object
      },
    })
  }

  return prisma.board.create({
    data: {
      userId,
      name,
    },
    include: {
      columns: true,
    },
  })
}

export async function updateBoard(id: Board['id'], board: Board) {
  console.log(board)
  return prisma.board.update({where: {id}, data: {...board}})
}

export async function removeBoard(id: Board['id']) {
  return prisma.board.delete({where: {id}})
}
