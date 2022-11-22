import express, {Router, Request, Response} from 'express'

//db model
import * as columnModel from './column.model'

//validation
import {
  validationSchema,
  validationOptions,
} from '../../middleware/validation.middleware'
import {body} from 'express-validator'

export const router: Router = express.Router()

const createFields = ['boardId', 'name']

router.post(
  '/column',
  body(createFields).exists(validationOptions),
  validationSchema,
  async (request: Request, response: Response) => {
    const {boardId, name, tasks} = request.body
    if (!boardId) response.status(500).json({message: 'boardId is required'})
    try {
      const board = await columnModel.addColumn(boardId, name, tasks)
      response.status(200).json(board)
    } catch (error) {
      console.log(error)
      response.status(500).json({message: 'could not add column', error})
    }
  },
)

router.put(
  '/column/:id',
  body('column').exists(validationOptions),
  validationSchema,
  async (request: Request, response: Response) => {
    const id = request.params.id
    const {column} = request.body

    try {
      const updatedColumn = await columnModel.updateColumn(id, column)
      response.status(200).json(updatedColumn)
    } catch (error) {
      console.log(error)
      response.status(500).json({message: 'could not update column', error})
    }
  },
)

router.delete('/column/:id', async (request: Request, response: Response) => {
  const id = request.params.id

  if (!id)
    return response
      .status(500)
      .json({message: 'id is required to delete column'})

  try {
    const column = await columnModel.removeColumn(id)
    response.status(200).json(column)
  } catch (error) {
    console.log(error)
    response.status(500).json({message: 'could not delete column', error})
  }
})
