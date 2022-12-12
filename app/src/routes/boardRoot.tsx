import * as React from 'react'
import {
  LoaderFunctionArgs,
  Outlet,
  redirect,
  useSearchParams,
} from 'react-router-dom'

import {useQuery, QueryClient} from '@tanstack/react-query'
import {client} from '../utils/api'
import {useAuth0} from '@auth0/auth0-react'
import AddBoard from '../components/AddBoard'
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
    const formData = await request.formData()
    const name = formData.get('name')
    const columnsData = formData.getAll('columns').map(column => {
      return {name: column}
    })
    if (typeof name !== 'string' || name.length === 0) {
      throw Error('form data invalid')
    }

    const board: Board = await client('api/board', {
      name,
      columns: columnsData,
    })

    await queryClient.invalidateQueries(['boards'])
    return redirect(`/board/${board.id}`)
  }

export default function BoardRoot() {
  const [searchParams] = useSearchParams()
  const {data: boards} = useQuery(boardsQuery())

  return (
    <div>
      <Outlet />
      {searchParams.get('add_board') && <AddBoard />}
    </div>
  )
}
