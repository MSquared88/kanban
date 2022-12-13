import * as React from 'react'
import {useMediaQuery} from 'react-responsive'
import MenuPopover from './mobile/MenuPopover'

//icons
import IconLogoMobile from '../../assets/logo-mobile'

export default function TopBar() {
  const isMobile = useMediaQuery({query: '(max-width: 375px)'})

  return (
    <div className="flex h-16 flex-row dark:bg-gray-dark">
      {isMobile ? (
        <>
          <IconLogoMobile width={30} height={30} />
          <MenuPopover />
        </>
      ) : (
        <>
          <h1>Board name</h1>
          <h1>add task</h1>
          <h1>meatBalls</h1>
        </>
      )}
    </div>
  )
}
