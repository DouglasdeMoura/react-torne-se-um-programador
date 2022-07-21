import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { useLogout } from './logout.hooks'

export const Logout: FC = () => {
  const { done } = useLogout()

  if (!done) {
    return null
  }

  return <Navigate to="/login" />
}
