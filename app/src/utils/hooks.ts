import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {Board, Column} from '../types'
import {client} from './api'
useBoardsQuery
export {useBoardsQuery}

function useBoardsQuery() {
  const {data: boards}: UseQueryResult<Board[]> = useQuery(
    ['boards'],
    async () => {
      const data = await client('api/board')
      return data
    },
  )
  return boards
}
