import {useState} from 'react'
import IconCross from '../../assets/icon-cross'

import classname from 'classnames'

interface FormInputProps {
  id?: string
  className?: string
  type?: string
  name: string
  error?: any
  ariaLabel?: string
  register?: any
  isChecked?: boolean
  toggleCheckbox?: () => void
}
const CheckboxWithX: React.FC<FormInputProps> = ({
  register,
  name,
  ariaLabel,
  isChecked,
  toggleCheckbox,
}) => {
  return (
    <label className="custom-checkbox-label inline-block h-6 w-6 cursor-pointer select-none ">
      <input
        type="checkbox"
        className="hidden"
        name={name}
        {...register(name)}
      />
      <span
        className={`flex h-full w-full items-center justify-center`}
        onClick={toggleCheckbox}
      >
        <IconCross
          width={15}
          height={15}
          className={classname([
            'transition-none',
            isChecked ? 'fill-red-primary' : 'fill-gray-medium',
          ])}
        />
      </span>
    </label>
  )
}

export default CheckboxWithX
