import { BrowserRouter, useRoutes } from 'react-router'

import { useAuth } from './context/auth/authContext'
import Article from './features/article'
import CreateArticle from './features/article/create'
import DetailArticle from './features/article/detail'
import EditArticle from './features/article/edit'
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
        },
        {
          path: '/article/:id',
          element: <DetailArticle />
        },
        {
          path: '/article/create',
          element: <CreateArticle />
        },
        {
          path: '/article/edit/:id',
          element: <EditArticle />
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
