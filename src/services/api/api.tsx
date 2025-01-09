import axios from 'axios'

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

API.interceptors.request.use(
  config => {
    const authInfo = JSON.parse(localStorage.getItem('auth') || '{}')

    if (authInfo.token)
      config.headers.Authorization = `Bearer ${authInfo.token}`

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  response => response.data,
  error => {
    console.log('Logging the error', error)

    // toast

    return Promise.reject(error)
  }
)
