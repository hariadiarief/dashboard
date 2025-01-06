import { BrowserRouter, Route, Routes } from 'react-router'

import { useAuth } from './context/auth/authContext'
import Login from './pages/authentication/login'
import Register from './pages/authentication/register'
import Home from './pages/home'

const privateRoutes = [
  {
    path: '/',
    element: <Home />
  }
]

const publicRoutes = [
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
]

export default function RoutesApp() {
  const { state: authState, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  } else {
    if (authState.isAuthenticated) {
      return (
        <BrowserRouter>
          <Routes>
            {privateRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))}
          </Routes>
        </BrowserRouter>
      )
    } else {
      return (
        <BrowserRouter>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))}
          </Routes>
        </BrowserRouter>
      )
    }
  }
}
