import * as React from 'react'

import {v4 as uuid} from 'uuid'
import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import {Form, useNavigate} from 'react-router-dom'

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
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={onClose}
          initialFocus={buttonRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Form method="post" className="flex flex-col">
                    <label>
                      <span>Board Name</span>
                      <input
                        placeholder="e.g. Web Design"
                        aria-label="board name"
                        type="text"
                        name="name"
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
                              defaultValue={column.name}
                              onChange={e => changeHandler(column.id, e)}
                            />
                            <button
                              type="button"
                              onClick={() => removeColumn(column.id)}
                            >
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
