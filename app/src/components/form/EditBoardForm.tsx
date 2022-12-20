import * as React from 'react'

import {v4 as uuid} from 'uuid'
import {Form, useActionData, useFetcher, useNavigate} from 'react-router-dom'
import Modal from '../Modal'
import FormInput from './FormInput'
import InputLabel from './InputLabel'
import IconCross from '../../assets/icon-cross'
import {Board, Column} from '../../types'

export default function EditBoardForm({board}: {board: Board}) {
  let navigate = useNavigate()
  const errors = useActionData()

  //state for columns from board
  const [columns, setColumns] = React.useState<Column[]>([])

  React.useEffect(() => {
    setColumns(board.columns as Column[])
  }, [])

  //local state for columns
  const [newColumns, setNewColumns] = React.useState<Column[]>([])

  //handlers for new columns
  function addNewColumn() {
    setNewColumns([...newColumns, {id: uuid(), name: ''}])
  }

  function removeNewColumn(columnId: Column['id']) {
    setNewColumns(newColumns.filter(column => column.id !== columnId))
  }

  function changeHandler(
    columnId: Column['id'],
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setNewColumns(
      columns.map(column => {
        if (columnId === column.id) return {...column, name: event.target.value}
        else return column
      }),
    )
  }

  function onClose() {
    navigate(-1)
  }

  const fetcher = useFetcher()
  console.log(fetcher.state)

  return (
    <Modal onClose={onClose} className="bg-white dark:bg-gray-dark">
      <h1 className=" text-xl font-bold dark:text-white">Edit Board</h1>

      {/*route form that changes board name on submission*/}
      <Form method="post" className="text-gra flex flex-col" id="board-name">
        <InputLabel className="mb-6" label="Board Name">
          <FormInput
            placeholder="e.g. Web Design"
            aria-label="board name"
            type="text"
            name="name"
            className="w-full text-gray-medium dark:text-white"
            error={errors}
            defaultValue={board ? board.name : ''}
          />
        </InputLabel>

        {/*adding new columns inputs*/}
        <InputLabel label="Board Columns">
          <ul className="flex max-h-48 flex-col gap-4 overflow-y-scroll ">
            {newColumns.map(column => (
              <li className="flex flex-row gap-4" key={column.id}>
                <FormInput
                  placeholder="column name"
                  ariaLabel="column"
                  type="text"
                  name="columns"
                  id={column.id}
                  className="w-full text-gray-medium dark:text-white"
                  defaultValue={column.name}
                  onChange={e => changeHandler(column.id, e)}
                  error={errors}
                />
                <button
                  type="button"
                  onClick={() => removeNewColumn(column.id)}
                  className="mr-4"
                >
                  <IconCross
                    width={15}
                    height={15}
                    className="fill-gray-medium focus:fill-red-primary"
                  />
                </button>
              </li>
            ))}
          </ul>
        </InputLabel>
      </Form>

      {/*columns from board*/}
      <ul className="flex max-h-60 flex-col gap-4 overflow-y-scroll ">
        {columns.map(column => (
          <li className="flex flex-row gap-4" key={column.id}>
            <FormInput
              placeholder="column name"
              ariaLabel="column"
              type="text"
              name="columns"
              id={column.id}
              className="w-full text-gray-medium dark:text-white"
              defaultValue={column.name}
            />
            <fetcher.Form method="delete">
              <button type="submit" className="mr-4">
                <IconCross
                  width={15}
                  height={15}
                  className="fill-gray-medium focus:fill-red-primary"
                />
              </button>
            </fetcher.Form>
          </li>
        ))}
      </ul>

      {/*buttons*/}
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-2">
        <button
          className="h-10 w-full rounded-full border-2  border-purple-primary bg-white text-purple-primary"
          type="button"
          onClick={addNewColumn}
        >
          + Add New Column
        </button>

        <button
          type="submit"
          form="board-name"
          className="h-10 w-full rounded-full bg-purple-primary text-white hover:bg-purple-hover"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  )
}
