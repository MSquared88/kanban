import React from 'react'

export interface ButtonProps {
  text: string | React.ReactNode
  onClick: () => void
  className?: string
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${props.className} rounded-full`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

export default Button
