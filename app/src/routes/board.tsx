import * as React from 'react'
import {QueryClient, useQuery} from '@tanstack/react-query'
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useParams,
} from 'react-router-dom'
import {useBoardDetail, boardDetailQuery} from '../utils/hooks/hooks.board'

export const loader =
  (queryClient: QueryClient) =>
  async ({params}: LoaderFunctionArgs) => {
    if (!params) return
    const query = boardDetailQuery(params?.boardId)
    if (!queryClient.getQueryData(boardDetailQuery(params?.boardId).queryKey)) {
      await queryClient.fetchQuery(boardDetailQuery(params?.boardId))
    }
    return
  }

export const action =
  (queryClient: QueryClient) =>
  async ({request, params}: ActionFunctionArgs) => {
    return
    // let formData = await request.formData()
    // const contact = await updateContact(params.contactId, {
    //   favorite: formData.get('favorite') === 'true',
    // })
    // await queryClient.invalidateQueries(['contacts'])
    // return contact
  }

const Board: React.FunctionComponent = () => {
  const params = useParams()
  // const board = useBoardDetail(params.boardId as string)
  // console.log('🚀 ~ file: board.tsx:50 ~ board', board)
  return (
    <div>
      <h1>board</h1>
    </div>
  )
}

export default Board
