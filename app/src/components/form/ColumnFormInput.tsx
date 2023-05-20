import * as React from 'react'
import {Column} from '../../types'
import CheckboxWithX from './CheckboxWithX'
import FormInput from './FormInput'
import classname from 'classnames'

interface FormInputProps {
  column: Column
  register?: any
}

const ColumnFormInput: React.FC<FormInputProps> = ({column, register}) => {
  const [isChecked, setIsChecked] = React.useState(false)

  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }
  return (
    <>
      <FormInput
        placeholder="column name"
        ariaLabel="column"
        type="text"
        id={column.id}
        name={`board.columns.${column.id}.name`}
        disabled={isChecked}
        className={classname([
          'w-full text-gray-medium dark:text-white',
          isChecked ? ' text-gray-light line-through dark:text-gray-400' : '',
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
