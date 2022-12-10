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

router.get('/board', async (request: Request, response: Response) => {
  // @ts-ignore
  const userId = request.auth?.sub

  try {
    const boards: Board[] = await boardModel.getBoards(userId)

    response.status(200).json(boards)
  } catch (error) {
    response.status(500).json({message: 'could not get boards', error})
  }
})
router.get('/board/:boardId', async (request: Request, response: Response) => {
  const params = request.params
  try {
    const board = await boardModel.getBoardById(params.boardId)

    response.status(200).json(board)
  } catch (error) {
    console.log(error)
    response.status(500).json({message: 'could not get board', error})
  }
})

router.post(
  '/board',
  body(['name']).exists(validationOptions),
  validationSchema,
  async (request: Request, response: Response) => {
    const {name, columns} = request.body
    // @ts-ignore
    const userId = request.auth?.sub

    try {
      const board = await boardModel.addBoard(userId, name, columns)
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
