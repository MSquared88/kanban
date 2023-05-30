import React from 'react'

import classname from 'classnames'

interface FormInputProps {
  name: string
  id?: string
  index?: number
  className?: string
  type?: string
  placeholder?: string
  defaultValue?: string
  errors?: any
  ariaLabel?: string
  register?: any
  required?: boolean
  disabled?: boolean
}

const HookFormInput: React.FC<FormInputProps> = ({
  id,
  className,
  type = 'text',
  name,
  placeholder,
  defaultValue,
  ariaLabel,
  register,
  disabled,
}) => {
  return (
    <>
      <input
        {...register(name, {required: "Can't be empty'"})}
        id={id}
        type={type}
        name={name}
        disabled={disabled}
        className={classname([
          'rounded-md border-[1px] border-gray-medium p-2 font-semibold text-black focus:border-purple-primary focus:outline-none focus:ring-2 dark:bg-gray-dark',
          className,
        ])}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-label={ariaLabel}
      />
    </>
  )
}

export default HookFormInput
