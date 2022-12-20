import React from 'react'

import classname from 'classnames'
import {ZodError, ZodErrorMap} from 'zod/lib/ZodError'

interface FormInputProps {
  id?: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  error?: any
  placeholder?: string
  required?: boolean
  defaultValue?: string
  ariaLabel?: string
  className?: string
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  onChange,
  type = 'text',
  error,
  placeholder,
  required,
  defaultValue,
  ariaLabel,
  className,
  id,
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
        required={required}
        defaultValue={defaultValue}
        aria-label={ariaLabel}
      />
      {error?.fieldErrors[name] && (
        <span className="error text-sm text-red-primary">
          {error?.fieldErrors[name]}
        </span>
      )}
    </>
  )
}

export default FormInput
