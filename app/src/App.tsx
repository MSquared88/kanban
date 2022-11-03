import {useAuth0} from '@auth0/auth0-react'
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {PageLoader} from './components/PageLoader'
import {ProtectedRoute} from './components/ProtectedRoute'

const AdminPage = () => <div>admin</div>
const ProtectedPage = () => <div>ProtectedPage</div>
const NotFoundPage = () => <div>not found</div>

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
        <Route path="/" element={<div>home</div>} />

        <Route
          path="/protected"
          element={<ProtectedRoute component={ProtectedPage} />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute component={AdminPage} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
