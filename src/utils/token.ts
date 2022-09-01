const TOKEN_KEY = 'token'

export const setToken = (token: string) =>
  typeof window !== 'undefined' ? localStorage.setItem(TOKEN_KEY, token) : null

export const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null

export const deleteToken = () =>
  typeof window !== 'undefined' ? localStorage.removeItem(TOKEN_KEY) : null
