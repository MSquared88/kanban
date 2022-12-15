import * as React from 'react'

import {v4 as uuid} from 'uuid'
import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import {Form, useNavigate} from 'react-router-dom'
import Modal from '../Modal'

export type ColumnInput = {
  id: string
  name: string
}

export default function AddBoard() {
  let navigate = useNavigate()
  let buttonRef = React.useRef<HTMLButtonElement>(null)
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
    <Modal onClose={onClose}>
      <Form method="post" className="flex flex-col">
        <label>
          <span>Board Name</span>
          <input
            placeholder="e.g. Web Design"
            aria-label="board name"
            type="text"
            name="name"
            required
          />
        </label>

        <label>
          <span>Board Columns</span>
          <ul className="flex flex-col">
            {columns.map(column => (
              <li className="flex flex-row" key={column.id}>
                <input
                  placeholder="column name"
                  aria-label="column"
                  type="text"
                  name="columns"
                  required
                  defaultValue={column.name}
                  onChange={e => changeHandler(column.id, e)}
                />
                <button type="button" onClick={() => removeColumn(column.id)}>
                  X
                </button>
              </li>
            ))}
          </ul>
        </label>

        <button type="button" onClick={() => addColumn()}>
          add column
        </button>

        <button type="submit">add board</button>
      </Form>
    </Modal>
  )
}
