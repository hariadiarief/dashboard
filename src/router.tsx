import { Navigate, useRoutes } from 'react-router'

import { useAuth } from './context/auth/authContext'
import PageNotFound from './features/404'
import Article from './features/article'
import CreateArticle from './features/article/create'
import DetailArticle from './features/article/detail'
import EditArticle from './features/article/edit'
import Login from './features/authentication/login'
import Register from './features/authentication/register'
import Dashboard from './features/dashboard'
import Layout from './features/layout'

export default function RoutesApp() {
  const { state: authState } = useAuth()

  const privateRoutes = [
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
        },
        { path: '*', element: <PageNotFound /> }
      ]
    },
    { path: '/register', element: <Navigate to='/' replace /> }
  ]

  const publicRoutes = [
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    { path: '*', element: <Navigate to='/' replace /> }
  ]

  return useRoutes(authState.isAuthenticated ? privateRoutes : publicRoutes)
}
