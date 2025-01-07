import { IActionAuth, IStateAuth } from './authTypes'

export const initialState: IStateAuth = {
  isAuthenticated: false,
  token: null
}

export const reducer = (state: IStateAuth, action: IActionAuth): IStateAuth => {
  switch (action.type) {
    case 'login':
      return {
        isAuthenticated: !!action.payload.token,
        token: action.payload.token
      }
    case 'auth-check':
      console.log('auth-check', !!action.payload.token)

      return {
        isAuthenticated: !!action.payload.token,
        token: action.payload.token
      }
    case 'logout':
      localStorage.clear()
      return initialState
    default:
      return state
  }
}
