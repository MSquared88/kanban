import classname from 'classnames'

type InputLabelProps = {
  label: string
  children: React.ReactNode
  className?: string
  // other props for the input element
}

const InputLabel: React.FC<InputLabelProps> = ({
  label,
  children,
  className,
  ...inputProps
}) => {
  return (
    <label
      className={classname([
        'flex flex-col gap-1 font-semibold text-gray-medium dark:text-white',
        className,
      ])}
      {...inputProps}
    >
      <h2 className="">{label}</h2>
      {children}
    </label>
  )
}

export default InputLabel
