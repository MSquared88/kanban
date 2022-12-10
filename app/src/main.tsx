import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//react query
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

//auth0
import {Auth0ProviderWithConfig} from './utils/auth/auth0-provider-with-config'

//routes
import {Layout} from './components/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import Login from './routes/login'
import Boards, {
  loader as boardsLoader,
  action as boardsAction,
} from './routes/boards'
import AddBoard from './components/AddBoard'
import Board, {
  loader as boardLoader,
  action as boardAction,
} from './routes/board'

const queryClient: QueryClient = new QueryClient()

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
          {
            path: ':boardId',
            element: <Board />,
            loader: boardLoader(queryClient),
            action: boardAction(queryClient),
          },
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
