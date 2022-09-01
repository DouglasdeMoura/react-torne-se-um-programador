import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { getToken } from '~/utils/token'

type IsAuthenticatedProps = {
  children?: React.ReactNode
}

export const IsAuthenticated: React.FC<IsAuthenticatedProps> = ({
  children,
}) => {
  const router = useRouter()

  useEffect(() => {
    if (!getToken()) {
      router.push(`/login?redirectPath=${router.pathname}`)
    }
  }, [router])

  return <>{getToken() ? children : null}</>
}
