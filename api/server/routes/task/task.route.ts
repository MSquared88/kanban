import express, {Router, Request, Response} from 'express'

//validation
import {
  validationSchema,
  validationOptions,
} from '../../middleware/validation.middleware'
import {body} from 'express-validator'

//prisma client model
import * as taskModel from './task.model'

export const router: Router = express.Router()

const createFields: string[] = ['columnId', 'title', 'description']

router.post(
  '/task',
  body(createFields).exists(validationOptions),
  validationSchema,
  async (request: Request, response: Response) => {
    const {columnId, title, description, subtasks} = request.body

    try {
      const task = await taskModel.addTask(
        columnId,
        title,
        description,
        subtasks,
      )
      response.status(200).json(task)
    } catch (error) {
      console.log(error)
      response.status(500).json({message: 'could not add task', error})
    }
  },
)

router.put(
  '/task/:id',
  body(['task']).exists(validationOptions),
  validationSchema,
  async (request: Request, response: Response) => {
    const id = request.params.id
    const {task} = request.body

    try {
      const updatedTask = await taskModel.updateTask(id, task)
      response.status(200).json(updatedTask)
    } catch (error) {
      console.log(error)
      response.status(500).json({message: 'could not update task', error})
    }
  },
)

router.delete('/task/:id', async (request: Request, response: Response) => {
  const id = request.params.id

  try {
    const task = await taskModel.removeTask(id)
    response.status(200).json(task)
  } catch (error) {
    console.log(error)
    response.status(500).json({message: 'could not add task', error})
  }
})
