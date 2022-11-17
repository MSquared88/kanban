import type {Board, Column, Task, Subtask, PrismaPromise} from '@prisma/client'

import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function getBoards(ownerId: Board['ownerId']) {
  return prisma.board.findMany({
    where: {
      ownerId,
    },
    //includes joined tables
    include: {
      columns: {include: {tasks: {include: {subtasks: true}}}},
    },
  })
}

export async function addBoard(
  ownerId: Board['ownerId'],
  name: Board['name'],
  columns?: Column[],
) {
  if (columns) {
    return prisma.board.create({
      data: {
        ownerId,
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
      ownerId,
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
