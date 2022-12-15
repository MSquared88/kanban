import {QueryClient} from '@tanstack/react-query'
import {ActionFunctionArgs, redirect} from 'react-router-dom'
import {destroyBoard} from '../utils/api/api.board'

export const action =
  (queryClient: QueryClient) =>
  async ({request, params}: ActionFunctionArgs) => {
    await destroyBoard(params.boardId)

    queryClient.invalidateQueries({queryKey: ['boards']})
    queryClient.invalidateQueries({
      queryKey: ['boards', 'detail', params.boardId],
    })
    return redirect('/board')
  }
