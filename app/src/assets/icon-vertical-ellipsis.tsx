import {SvgProps} from '../types'

const IconVerticalEllipsis: React.FunctionComponent<SvgProps> = ({
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
    <g
      fill="#828FA3"
      fillRule="evenodd"
      style={{transform: 'translate(5px, 0px)'}}
    >
      <circle cx="2.308" cy="2.308" r="2.308" />
      <circle cx="2.308" cy="10" r="2.308" />
      <circle cx="2.308" cy="17.692" r="2.308" />
    </g>
  </svg>
)

export default IconVerticalEllipsis
