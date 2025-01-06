import { API } from './api'

export interface ILoginPayload {
  identifier: string
  password: string
}
export interface ILoginResponse {
  jwt: string
  user: any
}

export interface IRegisterPayload {
  email: string
  username: string
  password: string
}

export const login = async (
  payload: ILoginPayload
): Promise<ILoginResponse> => {
  return await API.post('/api/auth/local', payload)
}

export const register = async (payload: IRegisterPayload): Promise<any> => {
  return await API.post('/api/auth/local/register', payload)
}
