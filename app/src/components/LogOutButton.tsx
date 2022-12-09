import {useAuth0} from '@auth0/auth0-react'

export const LogoutButton: React.FC = () => {
  const {logout} = useAuth0()
  const handleLogout = () => {
    window.localStorage.removeItem('token')
    logout({
      returnTo: `${window.location.origin}/login`,
    })
  }

  return (
    <button className="button__logout" onClick={handleLogout}>
      Log Out
    </button>
  )
}
