;<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
  <g fill="#828FA3" fill-rule="evenodd">
    <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
    <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
  </g>
</svg>

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
    <path stroke="#635FC7" stroke-width="2" fill="none" d="M9 6 5 2 1 6" />
  </svg>
)

export default IconChevronUp
