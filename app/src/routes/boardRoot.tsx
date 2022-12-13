import * as React from 'react'
import {
  LoaderFunctionArgs,
  Outlet,
  redirect,
  useSearchParams,
} from 'react-router-dom'

import {QueryClient} from '@tanstack/react-query'
import {client} from '../utils/api'
import AddBoard from '../components/nav/AddBoard'
import {Board} from '../types'

// ⬇️ define your query
const boardsQuery = () => ({
  queryKey: ['boards'],
  queryFn: async () => client('api/board'),
})

export const loader =
  (queryClient: QueryClient) =>
  async ({request}: LoaderFunctionArgs) => {
    if (!queryClient.getQueryData(boardsQuery().queryKey)) {
      await queryClient.fetchQuery(boardsQuery())
    }
    return
  }

export const action =
  (queryClient: QueryClient) =>
  async ({request}: LoaderFunctionArgs) => {
    //get form data from request
    const formData = await request.formData()

    //get name and columns from form data
    const name = formData.get('name')
    const columnsData = formData.getAll('columns').map(column => {
      return {name: column}
    })

    //validate form data
    if (typeof name !== 'string' || name.length === 0) {
      throw Error('form data invalid')
    }

    // create new board with form data
    const board: Board = await client('api/board', {
      name,
      columns: columnsData,
    })

    //invalidate boards query so that the new board will show up in the nav
    await queryClient.invalidateQueries(['boards'])

    //redirect to the new board page with the new board id
    return redirect(`/board/${board.id}`)
  }

export default function BoardRoot() {
  const [searchParams] = useSearchParams()

  return (
    <div>
      <Outlet />
      {searchParams.get('add_board') && <AddBoard />}
    </div>
  )
}
