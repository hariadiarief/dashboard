'use client'

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import { initialState, reducer } from './authReducer'
import { IActionAuth, IStateAuth } from './authTypes'

interface ContextProps {
  isLoading: boolean
  state: IStateAuth
  dispatch: React.Dispatch<IActionAuth>
}

const AuthContext = createContext<ContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setisLoading] = useState(true)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const auth = localStorage.getItem('token') || ''

    const payload = {
      token: auth
    }

    console.log({ payload })
    dispatch({
      type: 'auth-check',
      payload
    })

    setisLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isLoading, state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): ContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}
