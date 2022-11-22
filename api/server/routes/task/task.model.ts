import type {Task, Subtask, Column} from '@prisma/client'

import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function addTask(
  columnId: Column['id'],
  title: Task['title'],
  description: Task['description'],
  subtasks?: Subtask[],
) {
  if (subtasks) {
    return prisma.task.create({
      data: {
        columnId,
        title,
        description,
        subtasks: {create: [...subtasks]},
      },
      include: {
        subtasks: true, // Include all columns in the returned object
      },
    })
  }
  return prisma.task.create({
    data: {
      columnId,
      title,
      description,
    },
    include: {
      subtasks: true, // Include all columns in the returned object
    },
  })
}
export async function updateTask(id: Task['id'], task: Task) {
  return prisma.task.update({
    where: {id},
    data: {
      ...task,
    },
    include: {
      subtasks: true, // Include all columns in the returned object
    },
  })
}

export async function removeTask(id: Task['id']) {
  return prisma.task.delete({where: {id}})
}
