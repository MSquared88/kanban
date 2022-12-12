import {Navigate, useLocation} from 'react-router'

export const Root = () => {
  const location = useLocation()
  return <Navigate to="/login" state={{from: location}} replace />
}
