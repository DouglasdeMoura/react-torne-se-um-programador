import { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { getToken } from '~/utils/token'

export const IsAuthenticated: FC = () => {
  const { pathname } = useLocation()

  if (!getToken()) {
    return <Navigate to={`/login?redirectPath=${pathname}`} />
  }

  return <Outlet />
}
