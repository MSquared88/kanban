import React from 'react'
import {LogoutButton} from '../../LogOutButton'
import ThemePicker from '../ThemePicker'

export const SideBar = () => {
  return (
    <aside>
      <ThemePicker />
      <LogoutButton />
    </aside>
  )
}
