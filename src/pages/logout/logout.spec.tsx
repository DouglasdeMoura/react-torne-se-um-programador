import { mockNextRouter, render, waitFor } from '~/utils/test-utils'

import { Logout } from './logout'

const router = mockNextRouter()

describe('<Logout />', () => {
  it('deve excluir o token e redirecionar o usuário para a página de login', async () => {
    global.localStorage.setItem('token', 'mock_token')

    render(<Logout />)

    expect(global.localStorage.getItem('token')).toBeNull()

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/login')
    })
  })
})
