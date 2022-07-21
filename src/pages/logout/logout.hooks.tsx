import { useState } from 'react'

const getToken = () => localStorage.getItem('token')
const deleteToken = () => localStorage.removeItem('token')

export const useLogout = () => {
  const [hasToken, setHasToken] = useState(Boolean(getToken()))

  if (hasToken) {
    deleteToken()
    setHasToken(false)
  }

  return {
    done: !hasToken,
  }
}
