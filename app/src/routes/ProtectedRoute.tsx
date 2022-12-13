import {useAuth0} from '@auth0/auth0-react'
import {Navigate, useLocation} from 'react-router-dom'

export default function ProtectedRoute({children}: {children: JSX.Element}) {
  // Get the user and loading state from Auth0
  let {user, isLoading} = useAuth0()

  // Get the current location so we can redirect back to it after login
  let location = useLocation()

  if (isLoading) {
    return <h1>Loading</h1>
  }
  if (!user) {
    /* 
    Redirect them to the /login page, but save the current location they were
    trying to go to when they were redirected. 
    */
    return <Navigate to="/login" state={{from: location}} replace />
  }

  return children
}
