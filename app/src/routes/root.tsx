import {Navigate, useLocation} from 'react-router'

export const Root = () => {
  // Get the current location so we can redirect back to it after login
  const location = useLocation()
  return <Navigate to="/login" state={{from: location}} replace />
}
