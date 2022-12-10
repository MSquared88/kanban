import {useAuth0} from '@auth0/auth0-react'
import {Navigate, useLocation} from 'react-router-dom'

export default function ProtectedRoute({children}: {children: JSX.Element}) {
  let {user, isLoading} = useAuth0()

  let location = useLocation()

  if (isLoading) {
    return <h1>Loading</h1>
  }
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{from: location}} replace />
  }

  return children
}
