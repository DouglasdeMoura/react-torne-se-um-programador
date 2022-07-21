import { useState } from 'react'

import { deleteToken, getToken } from '~/utils/token'

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
