import * as React from 'react'
import {QueryClient, useQuery} from '@tanstack/react-query'
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useParams,
} from 'react-router-dom'
import {client} from '../utils/api'

const boardDetailQuery = (id: any) => ({
  queryKey: ['boards', 'detail', id],
  queryFn: async () => {
    const board = await client(`api/board/${id}`)
    if (!board) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      })
    }
    return board
  },
})

export const loader =
  (queryClient: QueryClient) =>
  async ({params}: LoaderFunctionArgs) => {
    const query = boardDetailQuery(params?.boardId)
    if (!queryClient.getQueryData(boardDetailQuery(params?.boardId).queryKey)) {
      await queryClient.fetchQuery(boardDetailQuery(params?.boardId))
    }
    return
  }

export const action =
  (queryClient: QueryClient) =>
  async ({request, params}: ActionFunctionArgs) => {
    // let formData = await request.formData()
    // const contact = await updateContact(params.contactId, {
    //   favorite: formData.get('favorite') === 'true',
    // })
    // await queryClient.invalidateQueries(['contacts'])
    // return contact
  }

const Board: React.FunctionComponent = () => {
  const params = useParams()
  const {data} = useQuery(boardDetailQuery(params?.boardId))
  console.log('🚀 ~ file: board.tsx:50 ~ board', data)
  return (
    <div>
      <h1>board</h1>
    </div>
  )
}

export default Board
