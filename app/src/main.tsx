import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

import {Auth0ProviderWithConfig} from './utils/auth/auth0-provider-with-config'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0ProviderWithConfig>
      <App />
    </Auth0ProviderWithConfig>
  </React.StrictMode>,
)
