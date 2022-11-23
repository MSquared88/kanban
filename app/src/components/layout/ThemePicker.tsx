import React, {useContext} from 'react'
import darkTheme from '../../assets/icon-dark-theme.svg'
import lightTheme from '../../assets/icon-light-theme.svg'
import {Switch} from '@headlessui/react'

import {DarkmodeCtx} from './Layout'

const MyToggle: React.FC = () => {
  const context = useContext(DarkmodeCtx)
  return (
    <Switch
      checked={context?.darkmode}
      onChange={context?.setDarkmode}
      className={`${
        context?.darkmode ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
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
    <div>
      <button onClick={() => alert('changed to dark')}>
        <img src={darkTheme} alt="" />
      </button>
      <MyToggle />
      <button onClick={() => alert('changed to light')}>
        <img src={lightTheme} alt="" />
      </button>
    </div>
  )
}

export default ThemePicker
