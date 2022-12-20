import * as React from 'react'
import {z} from 'zod'
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  Outlet,
  redirect,
  useSearchParams,
} from 'react-router-dom'

import {QueryClient} from '@tanstack/react-query'
import AddBoardForm from '../components/form/AddBoardForm'
import {Board, Column} from '../types'
import {addBoard, getBoards} from '../utils/api/api.board'

// customize error messages for zod
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.too_small) {
    return {message: "Can't be empty"}
  }
  return {message: ctx.defaultError}
}

z.setErrorMap(customErrorMap)
// ⬇️ define your query
const boardsQuery = () => ({
  queryKey: ['boards'],
  queryFn: async () => getBoards(),
})
export const action =
  (queryClient: QueryClient) =>
  async ({request}: ActionFunctionArgs) => {
    // ⬇️ use console.log to debug your action function
    // get form data from request
    const formData = await request.formData()

    //create new board from form data
    const newBoard: Board = {
      name: formData.get('name') as Board['name'],
      columns: formData.getAll('columns').map(column => ({
        name: column as Column['name'],
      })),
    }

    //validate new board
    const Schema = z.object({
      name: z.string().min(1).max(50),
      columns: z.array(z.object({name: z.string().min(1).max(50)})),
    })

    const result = Schema.safeParse(newBoard)

    // ⬇️ if the zod validation result is not successful, return the error object
    if (!result.success) {
      // ⬇️ return the error object
      console.log(result.error.flatten())
      return result.error.flatten()
    }

    //invalidate boards query    //post new board to apiS
    const board = await addBoard(newBoard)
    await queryClient.invalidateQueries(boardsQuery().queryKey)
    //redirect to new board
    return redirect(`/board/${board.id}`)
  }

export const loader =
  (queryClient: QueryClient) =>
  async ({request}: LoaderFunctionArgs) => {
    if (!queryClient.getQueryData(boardsQuery().queryKey)) {
      await queryClient.fetchQuery(boardsQuery())
    }
    return request
  }

export default function BoardRoot() {
  const [searchParams] = useSearchParams()

  return (
    <>
      <Outlet />
      {searchParams.get('add_board') && <AddBoardForm type="add" />}
    </>
  )
}
