import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {Board} from '../../types'
import {getBoard, getBoards} from '../api/api.board'

export {useBoardsQuery, boardDetailQuery, useBoardDetail}

function useBoardsQuery() {
  const {data: boards}: UseQueryResult<Board[]> = useQuery(
    ['boards'],
    async () => {
      const data = await getBoards()
      return data
    },
  )
  return boards
}

const boardDetailQuery = (id: string) => ({
  queryKey: ['boards', 'detail', id],
  queryFn: async () => {
    const board = await getBoard(id)
    if (!board) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      })
    }
    return board
  },
})

//get board detail query by id
function useBoardDetail(id: string): UseQueryResult<Board> {
  const board = useQuery(boardDetailQuery(id))

  return board
}
