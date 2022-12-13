import {useAuth0} from '@auth0/auth0-react'
import {Link, useLocation} from 'react-router-dom'

import * as React from 'react'

const Login: React.FC = () => {
  const {isAuthenticated, getAccessTokenSilently} = useAuth0()

  // set token in local storage
  React.useEffect(() => {
    // declare the data fetching function
    const setToken = async () => {
      // if authenticated, get token and set in local storage
      if (isAuthenticated) {
        const token = await getAccessTokenSilently()
        window.localStorage.setItem('token', token)
      }
    }

    // call the data fetching function
    setToken().catch(console.error)
  }, [isAuthenticated])

  // if authenticated, redirect to board page
  return isAuthenticated ? (
    <Link to="/board">go to boards</Link>
  ) : (
    <LoginButton />
  )
}

export default Login

const LoginButton: React.FC = () => {
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
