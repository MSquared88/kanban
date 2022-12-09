import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Auth0ProviderWithConfig} from './utils/auth/auth0-provider-with-config'

import {RouterProvider, createBrowserRouter} from 'react-router-dom'

//routes
import {Layout} from './components/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import Boards, {
  loader as boardsLoader,
  action as boardsAction,
} from './routes/boards'
import Login from './routes/login'
import AddBoard from './components/AddBoard'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const NotFoundPage = () => <div>not found</div>
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/boards',
        loader: boardsLoader(queryClient),
        action: boardsAction(queryClient),
        element: (
          <ProtectedRoute>
            <Boards />
          </ProtectedRoute>
        ),
        children: [
          {path: ':boardId', element: <h1>board id</h1>},
          {path: 'add', element: <AddBoard />},
        ],
      },
    ],
  },

  {path: 'login', element: <Login />},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithConfig>
        <RouterProvider router={router} />
        <ReactQueryDevtools position="bottom-right" />
      </Auth0ProviderWithConfig>
    </QueryClientProvider>
  </React.StrictMode>,
)
