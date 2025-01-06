export interface IStateAuth {
  isAuthenticated: boolean
  token: string
}
export type IActionAuth = IActionLogin | IActionLogout

export interface IActionLogin {
  type: 'login' | 'auth-check'
  payload: {
    token: string
  }
}

export interface IActionLogout {
  type: 'logout'
}
