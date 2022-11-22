import * as boardModel from './board.model'
import express, {Router, Request, Response} from 'express'
import {Board} from '@prisma/client'

//validation
import {
  validationSchema,
  validationOptions,
} from '../../middleware/validation.middleware'
import {body} from 'express-validator'

export const router: Router = express.Router()

router.get(
  '/board',
  body('ownerId').exists(validationOptions),
  validationSchema,
  async (request: Request, response: Response) => {
    const ownerId: Board['ownerId'] = request.body.ownerId

    try {
      const boards: Board[] = await boardModel.getBoards(ownerId)

      response.status(200).json(boards)
    } catch (error) {
      response.status(500).json({message: 'could not get boards', error})
    }
  },
)

router.post(
  '/board',
  body(['ownerId', 'name']).exists(validationOptions),
  validationSchema,
  async (request: Request, response: Response) => {
    const {ownerId, name, columns} = request.body

    try {
      const board = await boardModel.addBoard(ownerId, name, columns)
      response.status(200).json(board)
    } catch (error) {
      response.status(500).json({message: 'could not create board', error})
    }
  },
)

router.put(
  '/board/:id',
  body(['board']).exists(validationOptions),
  validationSchema,
  async (request: Request, response: Response) => {
    const id = request.params.id
    const {board} = request.body

    try {
      const updatedBoard = await boardModel.updateBoard(id, board)
      response.status(200).json(updatedBoard)
    } catch (error) {
      response.status(500).json({message: 'could not update board', error})
    }
  },
)

router.delete('/board/:id', async (request: Request, response: Response) => {
  const id = request.params.id
  if (!id)
    response.status(404).json({message: 'no boardId found in request body'})

  try {
    const board = await boardModel.removeBoard(id)
    response.status(200).json(board)
  } catch (error) {
    response.status(500).json({message: 'could not delete boards', error})
  }
})
