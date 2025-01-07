import { BrowserRouter, useRoutes } from 'react-router'

import { useAuth } from './context/auth/authContext'
import Article from './features/article'
import Login from './features/authentication/login'
import Register from './features/authentication/register'
import Dashboard from './features/dashboard'
import Layout from './features/layout'

const PrivateRoutes = () =>
  useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />
        },
        {
          path: '/article',
          element: <Article />
        }
      ]
    }
  ])

const PublicRoutes = () =>
  useRoutes([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ])

export default function RoutesApp() {
  const { state: authState, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  } else {
    if (authState.isAuthenticated) {
      return (
        <BrowserRouter>
          <PrivateRoutes />
        </BrowserRouter>
      )
    } else {
      return (
        <BrowserRouter>
          <PublicRoutes />
        </BrowserRouter>
      )
    }
  }
}
