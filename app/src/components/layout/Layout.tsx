import React from 'react'

import {SideBar} from './SideBar'

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
  // True if preference is set to dark, false otherwise.
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const [darkmode, setDarkmode] = React.useState(prefersDark)
  return (
    <div className={`${darkmode && 'dark'}`}>
      <DarkmodeCtx.Provider value={{darkmode, setDarkmode}}>
        <SideBar />
      </DarkmodeCtx.Provider>
      {children}
    </div>
  )
}

export {DarkmodeCtx}
