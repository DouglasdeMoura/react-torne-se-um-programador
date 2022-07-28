import { render, screen } from '~/utils/test-utils'

import { IsAuthenticated } from './is-authenticated'

vi.mock('react-router-dom', () => ({
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate">{to}</div>,
  Outlet: () => <div data-testid="outlet"></div>,
  useLocation: () => ({
    pathname: '/redirect',
  }),
}))

describe('<IsAuthenticated />', () => {
  it('deve redirecionar o usuário para página de login quando ele não estiver autenticado', () => {
    render(<IsAuthenticated />)

    expect(screen.getByTestId('navigate')).toHaveTextContent('/login')
  })

  it('deve renderizar os componentes filhos', () => {
    global.localStorage.setItem('token', 'mock_token')

    render(<IsAuthenticated />)

    expect(screen.getByTestId('outlet')).toBeInTheDocument()

    global.localStorage.removeItem('token')
  })
})
