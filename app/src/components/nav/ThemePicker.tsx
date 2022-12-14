import React, {useContext} from 'react'
import IconDarkTheme from '../../assets/icon-dark-theme'
import IconLightTheme from '../../assets/icon-light-theme'
import {Switch} from '@headlessui/react'

import {DarkmodeCtx} from '../Layout'

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
  const context = useContext(DarkmodeCtx)

  return (
    <div
      className={`mt-4 flex h-12 w-56 flex-row items-center justify-between rounded-md  px-6  py-1 dark:bg-gray-darkest`}
    >
      <IconLightTheme
        width={20}
        height={20}
        className="flex items-center justify-center"
      />
      <MyToggle />
      <IconDarkTheme
        width={20}
        height={20}
        className="flex items-center justify-center"
      />
    </div>
  )
}

export default ThemePicker
