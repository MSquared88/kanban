import {SvgProps} from '../types'

const IconCheck: React.FunctionComponent<SvgProps> = ({
  width,
  height,
  fill,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke="#FFF"
      stroke-width="2"
      fill="none"
      d="m1.276 3.066 2.756 2.756 5-5"
    />
  </svg>
)

export default IconCheck
