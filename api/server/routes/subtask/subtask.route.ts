import express, {Router, Request, Response} from 'express'

//prisma client model
import * as subtaskModel from './subtask.model'

//validation
import {
  validationSchema,
  validationOptions,
} from '../../middleware/validation.middleware'
import {body} from 'express-validator'

export const router: Router = express.Router()

router.post(
  '/subtask',
  body(['taskId', 'title']).exists(validationOptions),
  validationSchema,
  async (request: Request, response: Response) => {
    const {taskId, title} = request.body

    try {
      const subtask = await subtaskModel.addSubtask(taskId, title)
      response.status(200).json(subtask)
    } catch (error) {
      console.log(error)
      response.status(500).json({message: 'could not add subtask', error})
    }
  },
)

router.put(
  '/subtask/:id',
  body(['subtask']).exists(validationOptions),
  validationSchema,
  async (request: Request, response: Response) => {
    const id = request.params.id
    const {subtask} = request.body
    try {
      const updatedSubtask = await subtaskModel.updateSubtask(id, subtask)
      response.status(200).json(updatedSubtask)
    } catch (error) {
      console.log(error)
      response.status(500).json({message: 'could not update subtask', error})
    }
  },
)
