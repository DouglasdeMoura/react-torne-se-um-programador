import { render, screen, waitFor, mockNextRouter } from '~/utils/test-utils'

import { IsAuthenticated } from './is-authenticated'

const router = mockNextRouter({ pathname: '/redirect' })

describe('<IsAuthenticated />', () => {
  it('deve redirecionar o usuário para página de login quando ele não estiver autenticado', async () => {
    render(<IsAuthenticated />)

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/login?redirectPath=/redirect')
    })
  })

  it('deve renderizar os componentes filhos', () => {
    global.localStorage.setItem('token', 'mock_token')

    render(<IsAuthenticated>only for authenticated users</IsAuthenticated>)

    expect(screen.getByText('only for authenticated users')).toBeInTheDocument()

    global.localStorage.removeItem('token')
  })
})
