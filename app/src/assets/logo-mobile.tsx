import {SvgProps} from '../types'

const IconLogoMobile: React.FunctionComponent<SvgProps> = ({
  width,
  height,
  fill,
  className,
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <g fill="#635FC7" fill-rule="evenodd">
      <rect width="6" height="25" rx="2" />
      <rect opacity=".75" x="9" width="6" height="25" rx="2" />
      <rect opacity=".5" x="18" width="6" height="25" rx="2" />
    </g>
  </svg>
)

export default IconLogoMobile
