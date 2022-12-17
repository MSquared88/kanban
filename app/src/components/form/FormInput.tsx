import React from 'react'

import classname from 'classnames'

interface FormInputProps {
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  error?: string
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
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        onChange={onChange}
        className={classname([
          'rounded-md border-[1px] border-gray-medium p-2 font-semibold text-black focus:border-purple-primary focus:outline-none focus:ring-2 dark:bg-gray-dark',
          error ? 'invalid' : '',
          className,
        ])}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        aria-label={ariaLabel}
      />
      {error && <div className="error">{error}</div>}
    </>
  )
}

export default FormInput
