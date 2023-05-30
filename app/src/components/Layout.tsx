import {useAuth0} from '@auth0/auth0-react'
import React from 'react'
import {useMediaQuery} from 'react-responsive'
import {Outlet} from 'react-router-dom'
import TopBar from './nav/TopBar'

interface AppContextInterface {
  darkmode: boolean
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>
}

// Provider in your app

const DarkmodeCtx = React.createContext<AppContextInterface | null>(null)
export const Layout = () => {
  const isMobile = useMediaQuery({query: '(max-width: 375px)'})

  // True if preference is set to dark, false otherwise.
  // if explicitly picked than choice stored in local storage
  const prefersDark = localStorage.getItem('dark-theme')
    ? JSON.parse(localStorage.getItem('dark-theme') || '')
    : window.matchMedia('(prefers-color-scheme: dark)').matches

  const [darkmode, setDarkmode] = React.useState(prefersDark)
  React.useEffect(() => {
    if (darkmode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkmode])

  return (
    <DarkmodeCtx.Provider value={{darkmode, setDarkmode}}>
      <div className=" flex h-screen w-full flex-col bg-lines-light dark:bg-gray-darkest">
        <TopBar />
        <Outlet />
      </div>
    </DarkmodeCtx.Provider>
  )
}

export {DarkmodeCtx}
