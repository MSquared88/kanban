/**
 * Model Board
 *
 */
export type Board = {
  userId?: string
  id?: string
  name: string
  columns?: Column[]
}

/**
 * Model Column
 *
 */
export type Column = {
  id?: string
  name: string
  boardId?: string | null
  tasks?: Task[]
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
  subTasks: Subtask[]
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
