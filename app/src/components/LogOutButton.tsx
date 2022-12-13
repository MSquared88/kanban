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
    <button
      className="mt-6 rounded-lg bg-purple-primary px-4 py-2 font-semibold text-white hover:bg-purple-hover"
      onClick={handleLogout}
    >
      Log Out
    </button>
  )
}
