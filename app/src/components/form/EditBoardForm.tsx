import * as React from 'react'

import {useNavigate} from 'react-router-dom'
import Modal from '../Modal'
import HookFormInput from './HookFormInput'
import InputLabel from './InputLabel'
import IconCross from '../../assets/icon-cross'
import {Board, Column} from '../../types'
import {useForm, useFieldArray, SubmitHandler} from 'react-hook-form'
import ColumnFormInput from './ColumnFormInput'
import {Dialog} from '@headlessui/react'
import classname from 'classnames'

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
    control,
    trigger,
    formState: {errors, isValid},
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data)
    navigate(-1)
  }

  //state for columns from board
  const [columns, setColumns] = React.useState<Column[]>([])

  React.useEffect(() => {
    setColumns(board.columns as Column[])
  }, [])

  const {fields, append, remove} = useFieldArray({
    name: 'board.newColumns',
    control,
  })

  let [isOpen, setIsOpen] = React.useState(false)

  function onClose() {
    navigate(-1)
  }
  return (
    <Modal onClose={onClose} className={'bg-white dark:bg-gray-dark'}>
      <h1 className=" text-xl font-bold dark:text-white">Edit Board</h1>

      {/*route form that changes board name on submission*/}
      <form
        method="post"
        className="text-gra flex flex-col"
        id="board"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputLabel className="mb-6" label="Board Name">
          <HookFormInput
            placeholder="e.g. Web Design"
            aria-label="board name"
            type="text"
            required
            name={'board.name'}
            className={classname([
              'w-full text-gray-medium dark:text-white ',
              errors.board?.name ? ' border-red-primary' : '',
            ])}
            defaultValue={board ? board.name : ''}
            register={register}
          />
          {errors.board?.name && (
            <span className="error text-sm text-red-primary">
              {errors.board?.name?.message}
            </span>
          )}
        </InputLabel>

        <InputLabel label="Board Columns">
          {/*columns from board*/}
          <ul className="flex max-h-60 flex-col gap-4 overflow-y-scroll ">
            {columns.map(column => (
              <li className="flex flex-row items-center gap-4" key={column.id}>
                <ColumnFormInput
                  column={column}
                  register={register}
                  errors={errors}
                  className={
                    errors.board?.columns?.[column.id]?.name
                      ? 'invalid border-red-primary'
                      : ''
                  }
                />
                {errors && (
                  <span className="error text-sm text-red-primary">
                    {' '}
                    {errors.board?.columns?.[column.id]?.name?.message}
                  </span>
                )}
              </li>
            ))}

            {/*new columns*/}

            {fields.map((column, index) => (
              <li className="flex flex-row items-center gap-4" key={column.id}>
                <input
                  placeholder="column name"
                  type="text"
                  className={classname([
                    'w-full rounded-md border-[1px] border-gray-medium p-2 font-semibold text-gray-medium focus:border-purple-primary  focus:outline-none focus:ring-2 dark:bg-gray-dark dark:text-white',
                    errors.board?.newColumns?.[index]?.name
                      ? 'invalid border-red-primary'
                      : '',
                  ])}
                  {...register(`board.newColumns.${index}.name`, {
                    required: "Can't be empty",
                  })}
                />
                {errors && (
                  <span className="error text-sm text-red-primary">
                    {errors.board?.newColumns?.[index]?.name?.message}
                  </span>
                )}
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
            className="h-10 w-full rounded-full bg-purple-primary text-white hover:bg-purple-hover"
            onClick={e => {
              e.preventDefault()
              trigger()
              if (isValid) {
                setIsOpen(true)
              }
            }}
          >
            Save Changes
          </button>
        </div>
        <Dialog
          as="div"
          open={isOpen}
          className="relative z-20"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel
                className={`flex w-4/5 max-w-md transform flex-col gap-4 overflow-hidden rounded-md  bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-dark `}
              >
                {' '}
                <div className="mt-2 flex flex-col gap-4 rounded-md ">
                  <h1 className="text-lg font-semibold text-red-primary">
                    Edit this board
                  </h1>
                  <p className="text-sm font-semibold text-gray-500">
                    Are you sure you want to edit the "{board?.name}" board?
                    This action will delete all columns marked 'and all tasks
                    asscociated with them' and cannot be reversed.
                  </p>
                </div>
                <div className="mt-4 flex w-full flex-col justify-evenly gap-4">
                  <button
                    type="submit"
                    form="board"
                    className="text-bl inline-flex w-full justify-center rounded-full border border-transparent bg-red-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-hover  focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-bl inline-flex justify-center rounded-full border border-transparent bg-white px-4 py-2 text-sm font-medium text-purple-primary hover:bg-purple-hover focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
                    onClick={() => {
                      setIsOpen(false)
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </form>
    </Modal>
  )
}
