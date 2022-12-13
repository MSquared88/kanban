import React from 'react'
import {LogoutButton} from '../../LogOutButton'
import ThemePicker from '../ThemePicker'

export const SideBar = () => {
  // use the useState hook to create a visible state
  const [visible, setVisible] = React.useState(false)

  // method to toggle the visibility of the sidebar
  const toggleVisibility = () => {
    setVisible(prevVisible => !prevVisible)
  }
  return (
    <>
      {/* use the visible state to conditionally render the sidebar */}
      {visible && (
        <aside>
          <ThemePicker />
          <LogoutButton />
        </aside>
      )}

      {/* button to toggle the visibility of the sidebar */}
      <button onClick={toggleVisibility}>Toggle Sidebar</button>
    </>
  )
}
