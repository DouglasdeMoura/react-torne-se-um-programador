import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { getToken } from '~/utils/token'

export const IsAuthenticated: FC = () => {
  if (!getToken()) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
