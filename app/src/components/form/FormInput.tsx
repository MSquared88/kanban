import React from 'react'

import classname from 'classnames'
import {ZodError, ZodErrorMap} from 'zod/lib/ZodError'

interface FormInputProps {
  id?: string
  index?: number
  className?: string
  type?: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  defaultValue?: string
  error?: any
  ariaLabel?: string
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  index,
  className,
  type = 'text',
  name,
  onChange,
  placeholder,
  defaultValue,
  error,
  ariaLabel,
}) => {
  return (
    <>
      <input
        id={id}
        type={type}
        name={name}
        onChange={onChange}
        className={classname([
          'rounded-md border-[1px] border-gray-medium p-2 font-semibold text-black focus:border-purple-primary focus:outline-none focus:ring-2 dark:bg-gray-dark',
          error?.fieldErrors[name] ? 'invalid border-red-primary' : '',
          className,
        ])}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-label={ariaLabel}
      />
      {error?.fieldErrors[name] && (
        <span className="error text-sm text-red-primary">
          {error?.fieldErrors[name][index || 0]}
        </span>
      )}
    </>
  )
}

export default FormInput
