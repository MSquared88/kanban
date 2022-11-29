/**
 * Model Board
 *
 */
export type Board = {
  ownerId: string
  id: string
  name: string
}

/**
 * Model Column
 *
 */
export type Column = {
  id: string
  name: string
  boardId: string | null
}

/**
 * Model Task
 *
 */
export type Task = {
  id: string
  title: string
  description: string
  columnId: string | null
}

/**
 * Model Subtask
 *
 */
export type Subtask = {
  id: string
  title: string
  isComplete: boolean
  taskId: string | null
}
