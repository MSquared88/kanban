import * as React from 'react'
import {QueryClient, useQuery} from '@tanstack/react-query'
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import {useBoardDetail, boardDetailQuery} from '../utils/hooks/hooks.board'
import {editBoard} from '../utils/api/api.board'
import DestroyBoardModal from '../components/nav/DestroyBoardModal'
import EditBoardForm from '../components/form/EditBoardForm'
import {Board, Column} from '../types'

import {z} from 'zod'

export const loader =
  (queryClient: QueryClient) =>
  async ({params}: LoaderFunctionArgs) => {
    // redirect to board if no boardId is provided
    if (!params.boardId) return redirect('/board')

    const {boardId} = params
    const query = boardDetailQuery(boardId)
    if (!queryClient.getQueryData(boardDetailQuery(boardId).queryKey)) {
      await queryClient.fetchQuery(boardDetailQuery(boardId))
    }
    return
  }

export const action =
  (queryClient: QueryClient) =>
  async ({request, params}: ActionFunctionArgs) => {
    // redirect to board if no boardId is provided
    if (!params.boardId) return redirect('/board')

    const formData = await request.formData()
    console.log(
      '🚀 ~ file: board.tsx:39 ~ formData',
      formData.getAll('columns'),
    )

    //create updated board from form data
    const updatedBoard: Board = {
      name: formData.get('name') as Board['name'],
      columns: formData.getAll('columns').map(column => ({
        id: column as Column['id'],
        name: column as Column['name'],
      })),
    }

    //validate updated board
    const Schema = z.object({
      name: z.string().min(1).max(50),
      columns: z.array(z.object({name: z.string().min(1).max(50)})),
    })

    const result = Schema.safeParse(updatedBoard)

    // ⬇️ if the zod validation result is not successful, return the error object
    if (!result.success) {
      // ⬇️ return the error object
      console.log(result.error.flatten())
      return result.error.flatten()
    }
    console.log(updatedBoard)
    // //invalidate boards query
    // //post updated board to api
    // const board = await editBoard(params.boardId, updatedBoard)
    // await queryClient.invalidateQueries(
    //   boardDetailQuery(params.boardId).queryKey,
    // )
    // //redirect to new board
    // return redirect(`/board/${board.id}`)
  }

const BoardDetail: React.FunctionComponent = () => {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const {data: board} = useBoardDetail(params.boardId as string)
  // console.log('🚀 ~ file: board.tsx:50 ~ board', board)
  return (
    <>
      <div>
        <h1>board</h1>
      </div>
      {searchParams.get('destroy_board') && <DestroyBoardModal />}
      {searchParams.get('edit_board') && (
        <EditBoardForm type="edit" board={board} />
      )}
    </>
  )
}

export default BoardDetail
