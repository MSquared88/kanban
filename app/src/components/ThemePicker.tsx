import React, {useContext} from 'react'
import darkTheme from '../assets/icon-dark-theme.svg'
import lightTheme from '../assets/icon-light-theme.svg'
import {Switch} from '@headlessui/react'

import {DarkmodeCtx} from './Layout'

const MyToggle: React.FC = () => {
  const context = useContext(DarkmodeCtx)

  const handleSwitch = () => {
    context?.setDarkmode(s => {
      localStorage.setItem('dark-theme', JSON.stringify(!s))
      return !s
    })
  }
  return (
    <Switch
      checked={context?.darkmode}
      onChange={handleSwitch}
      className={`relative inline-flex h-6 w-11 items-center rounded-full bg-purple-primary`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          context?.darkmode ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}
const ThemePicker = () => {
  return (
    <div className="flex w-36 justify-between bg-gray-darkest py-1 px-3">
      <img src={lightTheme} alt="" />
      <MyToggle />
      <img src={darkTheme} alt="" />
    </div>
  )
}

export default ThemePicker
