import React from 'react'
import {useMediaQuery} from 'react-responsive'
import DesktopView from './desktop/DesktopView'
import MobileView from './mobile/MobileView'

interface AppContextInterface {
  darkmode: boolean
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>
}

// Provider in your app

const DarkmodeCtx = React.createContext<AppContextInterface | null>(null)
export const Layout = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[]
}) => {
  const isMobile = useMediaQuery({query: '(max-width: 375px)'})

  // True if preference is set to dark, false otherwise.
  // if explicitly picked than choice stored in local storage
  const prefersDark = localStorage.getItem('dark-theme')
    ? JSON.parse(localStorage.getItem('dark-theme') || '')
    : window.matchMedia('(prefers-color-scheme: dark)').matches

  const [darkmode, setDarkmode] = React.useState(prefersDark)

  return (
    <div className={`${darkmode && 'dark'}`}>
      <DarkmodeCtx.Provider value={{darkmode, setDarkmode}}>
        {isMobile ? <MobileView /> : <DesktopView />}
      </DarkmodeCtx.Provider>
      {children}
    </div>
  )
}

export {DarkmodeCtx}
