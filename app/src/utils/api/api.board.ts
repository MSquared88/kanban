import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {Board, Column} from '../../types'

export {getBoard, getBoards, addBoard, destroyBoard}
const apiURL = import.meta.env.VITE_API_SERVER_URL

//get all boards
function getBoards(): Promise<Board[]> {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Unauthorized')
  }
  return fetch(`${apiURL}/api/board`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(async res => {
    if (res.status === 401) {
      throw new Error('Unauthorized')
    }
    const data = await res.json()
    if (res.ok) {
      return data as Board[]
    } else {
      return Promise.reject(data)
    }
  })
}

//get board by id
function getBoard(id: string): Promise<Board> {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Unauthorized')
  }
  return fetch(`${apiURL}/api/board/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(async res => {
    if (res.status === 401) {
      throw new Error('Unauthorized')
    }
    const data = await res.json()
    if (res.ok) {
      return data as Board
    } else {
      return Promise.reject(data)
    }
  })
}

//add new board
function addBoard(newBoard: Board): Promise<Board> {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Unauthorized')
  }
  return fetch(`${apiURL}/api/board/`, {
    method: 'POST',
    body: JSON.stringify(newBoard),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(async res => {
    if (res.status === 401) {
      throw new Error('Unauthorized')
    }
    const data = await res.json()
    if (res.ok) {
      return data as Board
    } else {
      return Promise.reject(data)
    }
  })
}

//delete board
function destroyBoard(id: Board['id']): Promise<Board> {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Unauthorized')
  }
  return fetch(`${apiURL}/api/board/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(async res => {
    if (res.status === 401) {
      throw new Error('Unauthorized')
    }
    const data = await res.json()
    if (res.ok) {
      return data as Board
    } else {
      return Promise.reject(data)
    }
  })
}
