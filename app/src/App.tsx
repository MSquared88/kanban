import {useAuth0} from '@auth0/auth0-react'
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {PageLoader} from './components/PageLoader'
import {ProtectedRoute} from './pages/ProtectedRoute'
import {ProtectedPage} from './pages/ProtectedPage'
import {Layout} from './components/layout/Layout'

const NotFoundPage = () => <div>not found</div>

export const LogoutButton: React.FC = () => {
  const {logout, user} = useAuth0()
  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    })
  }

  return (
    <button className="button__logout" onClick={handleLogout}>
      Log Out
    </button>
  )
}
export const LoginButton: React.FC = () => {
  const {loginWithRedirect} = useAuth0()
  const handleLogin = async () => {
    await loginWithRedirect({
      prompt: 'login',
      appState: {
        returnTo: '/protected',
      },
    })
  }

  return (
    <button className="button__login" onClick={handleLogin}>
      Log In
    </button>
  )
}

export const App: React.FC = () => {
  const {isLoading} = useAuth0()

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    )
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <div className="bg-red-300 font-jakarta dark:bg-black">
                <LogoutButton /> <LoginButton />
              </div>
            </Layout>
          }
        />

        <Route
          path="/protected"
          element={<ProtectedRoute component={ProtectedPage} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
