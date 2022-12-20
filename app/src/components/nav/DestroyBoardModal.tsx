import {Form, Link, useNavigate, useParams} from 'react-router-dom'
import Modal from '../Modal'
import {useBoardDetail} from '../../utils/hooks/hooks.board'

export default function DestroyBoardModal() {
  let navigate = useNavigate()
  const params = useParams()
  const {data: board} = useBoardDetail(params.boardId as string)

  function onClose() {
    navigate(-1)
  }
  return (
    <Modal onClose={onClose} className="">
      {' '}
      <div className="mt-2 flex flex-col gap-4 rounded-md ">
        <h1 className="text-lg font-semibold text-red-primary">
          Delete this board
        </h1>
        <p className="text-sm font-semibold text-gray-500">
          Are you sure you want to delete the "{board?.name}" board? This action
          will remove all columns and tasks and cannot be reversed.
        </p>
      </div>
      <div className="mt-4 flex w-full flex-col justify-evenly gap-4">
        <Form method="post" action="destroy">
          <button
            type="submit"
            className="text-bl inline-flex w-full justify-center rounded-full border border-transparent bg-red-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-hover  focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
          >
            Delete
          </button>
        </Form>
        <button
          type="button"
          className="text-bl inline-flex justify-center rounded-full border border-transparent bg-white px-4 py-2 text-sm font-medium text-purple-primary hover:bg-purple-hover focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
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
