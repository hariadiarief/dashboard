import { IActionAuth, IStateAuth } from './authTypes'

export const initialState: IStateAuth = {
  isAuthenticated: false,
  authInfo: undefined
}

export const reducer = (state: IStateAuth, action: IActionAuth): IStateAuth => {
  switch (action.type) {
    case 'login':
      return {
        isAuthenticated: !!action.payload,
        authInfo: action.payload
      }
    case 'auth-check':
      return {
        isAuthenticated: !!action.payload,
        authInfo: action.payload
      }
    case 'logout':
      localStorage.clear()
      return initialState
    default:
      return state
  }
}
