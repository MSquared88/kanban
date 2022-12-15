import * as React from 'react'
import {
  LoaderFunctionArgs,
  Outlet,
  redirect,
  useSearchParams,
} from 'react-router-dom'

import {QueryClient} from '@tanstack/react-query'
import AddBoard from '../components/nav/AddBoard'
import {Board, Column} from '../types'
import {addBoard, getBoards} from '../utils/api/api.board'

// ⬇️ define your query
const boardsQuery = () => ({
  queryKey: ['boards'],
  queryFn: async () => getBoards(),
})

export const loader =
  (queryClient: QueryClient) =>
  async ({request}: LoaderFunctionArgs) => {
    if (!queryClient.getQueryData(boardsQuery().queryKey)) {
      await queryClient.fetchQuery(boardsQuery())
    }
    return request
  }

export const action =
  (queryClient: QueryClient) =>
  async ({request}: LoaderFunctionArgs) => {
    //get form data from request
    const formData = await request.formData()
    //create new board from form data
    const newBoard: Board = {
      name: formData.get('name') as Board['name'],
      columns: formData.getAll('columns').map(column => ({
        name: column as Column['name'],
      })),
    }

    //post new board to apiS
    const board = await addBoard(newBoard)
    //invalidate boards query
    await queryClient.invalidateQueries(boardsQuery().queryKey)
    //redirect to new board
    return redirect(`/board/${board.id}`)
  }
export default function BoardRoot() {
  const [searchParams] = useSearchParams()

  return (
    <>
      <Outlet />
      {searchParams.get('add_board') && <AddBoard />}
    </>
  )
}
