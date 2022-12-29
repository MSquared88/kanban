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
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-darkest ">
      <main className="flex h-52 w-52 items-center justify-center bg-gray-dark">
        {isAuthenticated ? (
          <Link
            to="/board"
            className="flex h-8 w-36 items-center justify-center rounded-full bg-purple-primary text-white"
            h-8
          >
            go to boards
          </Link>
        ) : (
          <LoginButton />
        )}
      </main>
    </div>
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
    <button
      className="flex h-8 w-36 items-center justify-center rounded-full bg-purple-primary text-white"
      onClick={handleLogin}
    >
      Log In
    </button>
  )
}
