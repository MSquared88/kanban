import {useAuth0} from '@auth0/auth0-react'
import {Link, useLocation} from 'react-router-dom'

import * as React from 'react'

const Login: React.FC = () => {
  const {isAuthenticated, getAccessTokenSilently} = useAuth0()
  React.useEffect(() => {
    // declare the data fetching function
    const setToken = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently()
        window.localStorage.setItem('token', token)
      }
    }

    // call the function
    setToken()
      // make sure to catch any error
      .catch(console.error)
  }, [isAuthenticated])
  return isAuthenticated ? (
    <Link to="/board">go to boards</Link>
  ) : (
    <LoginButton />
  )
}

export default Login

const LoginButton: React.FC = () => {
  const location = useLocation()
  let from = location.state?.from?.pathname || '/boards'
  const {loginWithPopup} = useAuth0()
  const handleLogin = async () => {
    await loginWithPopup({
      prompt: 'login',
    })
  }

  return (
    <button className="" onClick={handleLogin}>
      Log In
    </button>
  )
}
