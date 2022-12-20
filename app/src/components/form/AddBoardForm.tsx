import * as React from 'react'

import {v4 as uuid} from 'uuid'
import {Form, useActionData, useNavigate} from 'react-router-dom'
import Modal from '../Modal'
import FormInput from '../form/FormInput'
import InputLabel from '../form/InputLabel'
import IconCross from '../../assets/icon-cross'

export type ColumnInput = {
  id: string
  name: string
}

export default function AddBoardForm() {
  let navigate = useNavigate()
  const errors = useActionData()
  useActionData()
  const [columns, setColumns] = React.useState<ColumnInput[]>([])

  function addColumn() {
    setColumns([...columns, {id: uuid(), name: ''}])
  }

  function removeColumn(columnId: ColumnInput['id']) {
    setColumns(columns.filter(column => column.id !== columnId))
  }
  function changeHandler(
    columnId: ColumnInput['id'],
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setColumns(
      columns.map(column => {
        if (columnId === column.id) return {...column, name: event.target.value}
        else return column
      }),
    )
  }

  function onClose() {
    navigate(-1)
  }

  return (
    <Modal onClose={onClose} className="bg-white dark:bg-gray-dark">
      <h1 className=" text-xl font-bold dark:text-white">Add New Board</h1>
      <Form method="post" className="text-gra flex flex-col ">
        <InputLabel className="mb-6" label="Board Name">
          <FormInput
            placeholder="e.g. Web Design"
            aria-label="board name"
            type="text"
            name="name"
            className="w-full text-gray-medium dark:text-white"
            error={errors}
          />
        </InputLabel>

        <InputLabel label="Board Columns">
          <ul className="flex max-h-60 flex-col gap-4 overflow-y-scroll ">
            {columns.map(column => (
              <li className="flex flex-row gap-4" key={column.id}>
                <FormInput
                  placeholder="column name"
                  ariaLabel="column"
                  type="text"
                  name="columns"
                  className="w-full text-gray-medium dark:text-white"
                  defaultValue={column.name}
                  onChange={e => changeHandler(column.id, e)}
                  error={errors}
                />
                <button
                  type="button"
                  onClick={() => removeColumn(column.id)}
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
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-2">
          <button
            className="h-10 w-full rounded-full border-2  border-purple-primary bg-white text-purple-primary"
            type="button"
            onClick={() => addColumn()}
          >
            + Add New Column
          </button>

          <button
            type="submit"
            className="h-10 w-full rounded-full bg-purple-primary text-white hover:bg-purple-hover"
          >
            Create New Board
          </button>
        </div>
      </Form>
    </Modal>
  )
}
