import * as React from 'react'

import {Form, Link, useNavigate, useParams} from 'react-router-dom'
import Modal from '../Modal'
import {Board, Column, Task} from '../../types'
import {ControlledModal} from '../ControlledModal'
import {Dialog, Transition} from '@headlessui/react'
import {useBoardDetail} from '../../utils/hooks/hooks.board'

export default function DestroyBoardModal() {
  let navigate = useNavigate()
  const params = useParams()
  const {data: board} = useBoardDetail(params.boardId as string)

  function onClose() {
    navigate(-1)
  }
  return (
    <Modal onClose={onClose}>
      {' '}
      <div className="mt-2">
        <h2>Delete this board</h2>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete the "{board.name}" board? This action
          will remove all columns and tasks and cannot be reversed.
        </p>
      </div>
      <div className="mt-4">
        <Form method="post" action={`board/${board.id}/destroy`}>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Delete
          </button>
        </Form>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}
