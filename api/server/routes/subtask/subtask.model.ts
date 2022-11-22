import type {Task, Subtask} from '@prisma/client'

import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function addSubtask(taskId: Task['id'], title: Subtask['title']) {
  return prisma.subtask.create({
    data: {
      taskId,
      title,
    },
  })
}

export async function updateSubtask(id: Subtask['id'], subtask: Subtask) {
  return prisma.subtask.update({
    where: {id},
    data: {
      ...subtask,
    },
  })
}
