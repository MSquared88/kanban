import {SvgProps} from '../types'

const IconChevronDown: React.FunctionComponent<SvgProps> = ({
  width,
  height,
  fill,
  className,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMaxYMax meet"
  >
    <path
      stroke="#635FC7"
      strokeWidth="2"
      fill="none"
      d="m1 1 4 4 4-4"
      style={{transform: 'translate(3px, 3px)'}}
    />
  </svg>
)

export default IconChevronDown
