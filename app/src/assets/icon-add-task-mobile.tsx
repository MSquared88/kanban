import {SvgProps} from '../types'

const IconAddTaskMobile: React.FunctionComponent<SvgProps> = ({
  width,
  height,
  fill,
  className,
}) => (
  <svg
    width={width}
    height={height}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#FFF"
      d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
      style={{transform: 'translate(6px, 6px)'}}
    />
  </svg>
)

export default IconAddTaskMobile
