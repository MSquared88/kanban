import * as React from 'react'
import {Column} from '../../types'
import CheckboxWithX from './CheckboxWithX'
import HookFormInput from './HookFormInput'
import classname from 'classnames'

interface FormInputProps {
  column: Column
  className?: string
  register?: any
  errors?: any
}

const ColumnFormInput: React.FC<FormInputProps> = ({
  column,
  register,
  className,
}) => {
  const [isChecked, setIsChecked] = React.useState(false)

  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }
  return (
    <>
      <HookFormInput
        placeholder="column name"
        ariaLabel="column"
        type="text"
        id={column.id}
        name={`board.columns.${column.id}.name`}
        disabled={isChecked}
        className={classname([
          'w-full text-gray-medium dark:text-white',
          isChecked
            ? ' text-red-primary line-through dark:text-red-primary'
            : '',
          className,
        ])}
        defaultValue={column.name}
        register={register}
      />
      <CheckboxWithX
        type="checkbox"
        id={`delete-${column.id}`}
        className="hidden"
        name={`board.columns.${column.id}.delete`}
        register={register}
        isChecked={isChecked}
        toggleCheckbox={toggleCheckbox}
      />
    </>
  )
}

export default ColumnFormInput
