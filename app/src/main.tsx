import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//react query
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {RouterProvider, createBrowserRouter, Navigate} from 'react-router-dom'

//auth0
import {Auth0ProviderWithConfig} from './utils/auth/auth0-provider-with-config'

//routes
import {Layout} from './components/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import Login from './routes/login'
import BoardRoot, {
  loader as boardsLoader,
  action as boardsAction,
} from './routes/boardRoot'
import Board, {
  loader as boardLoader,
  action as boardAction,
} from './routes/board'
import {Root} from './routes/root'
import {action as destroyAction} from './routes/destroyBoard'
import BoardDetail from './routes/board'

const queryClient: QueryClient = new QueryClient()

const router = createBrowserRouter([
  {path: '/', element: <Root />},
  {
    element: <Layout />,
    children: [
      {
        path: '/board',
        loader: boardsLoader(queryClient),
        action: boardsAction(queryClient),
        element: (
          <ProtectedRoute>
            <BoardRoot />
          </ProtectedRoute>
        ),
        children: [
          {
            path: ':boardId',
            element: <BoardDetail />,
            loader: boardLoader(queryClient),
            action: boardAction(queryClient),
          },
          {
            path: ':boardId/destroy',
            action: destroyAction(queryClient),
          },
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
