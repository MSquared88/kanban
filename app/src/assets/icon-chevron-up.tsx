import {SvgProps} from '../types'

const IconChevronUp: React.FunctionComponent<SvgProps> = ({
  width,
  height,
  fill,
  className,
}) => (
  <svg
    width={width}
    height={height}
    fill={fill}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke="#635FC7"
      strokeWidth="2"
      fill="none"
      d="M9 6 5 2 1 6"
      style={{transform: 'translate(3px, 3px)'}}
    />
  </svg>
)

export default IconChevronUp
