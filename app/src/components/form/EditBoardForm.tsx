import * as React from 'react'

import {useNavigate} from 'react-router-dom'
import Modal from '../Modal'
import FormInput from './FormInput'
import InputLabel from './InputLabel'
import IconCross from '../../assets/icon-cross'
import {Board, Column} from '../../types'
import {useForm, useFieldArray, SubmitHandler} from 'react-hook-form'
import ColumnFormInput from './ColumnFormInput'

type FormValues = {
  board: {
    columns: [{name: string; delete: boolean}]
    newColumns: {name: string}[]
    name: string
  }
}

export default function EditBoardForm({board}: {board: Board}) {
  let navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    control,
    formState: {errors},
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = data => console.log(data)

  //state for columns from board
  const [columns, setColumns] = React.useState<Column[]>([])

  React.useEffect(() => {
    setColumns(board.columns as Column[])
  }, [])

  const {fields, append, remove} = useFieldArray({
    name: 'board.newColumns',
    control,
  })

  function onClose() {
    navigate(-1)
  }

  return (
    <Modal onClose={onClose} className="bg-white dark:bg-gray-dark">
      <h1 className=" text-xl font-bold dark:text-white">Edit Board</h1>

      {/*route form that changes board name on submission*/}
      <form
        method="post"
        className="text-gra flex flex-col"
        id="board"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputLabel className="mb-6" label="Board Name">
          <FormInput
            placeholder="e.g. Web Design"
            aria-label="board name"
            type="text"
            name={'board.name'}
            className="w-full text-gray-medium dark:text-white"
            defaultValue={board ? board.name : ''}
            register={register}
          />
        </InputLabel>

        <InputLabel label="Board Columns">
          {/*columns from board*/}
          <ul className="flex max-h-60 flex-col gap-4 overflow-y-scroll ">
            {columns.map((column, i) => (
              <li className="flex flex-row items-center gap-4" key={column.id}>
                <ColumnFormInput column={column} register={register} />
              </li>
            ))}

            {/*new columns*/}

            {fields.map((column, index) => (
              <li className="flex flex-row items-center gap-4" key={column.id}>
                <FormInput
                  placeholder="column name"
                  ariaLabel="new column"
                  name={`board.newColumns.${index}.name`}
                  type="text"
                  className="w-full text-gray-medium dark:text-white"
                  register={register}
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    remove(index)
                  }}
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

        {/*buttons*/}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-2">
          <button
            className="h-10 w-full rounded-full border-2  border-purple-primary bg-white text-purple-primary"
            type="button"
            onClick={() => {
              append({name: ''})
            }}
          >
            + Add New Column
          </button>

          <button
            type="submit"
            form="board"
            className="h-10 w-full rounded-full bg-purple-primary text-white hover:bg-purple-hover"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  )
}
