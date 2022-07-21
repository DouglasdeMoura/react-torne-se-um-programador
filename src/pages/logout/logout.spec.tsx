import { render, screen } from '~/utils/test-utils'

import { Logout } from './logout'

vi.mock('react-router-dom', () => ({
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate">{to}</div>,
}))

describe('<Logout />', () => {
  it('deve excluir o token e redirecionar o usuário para a página de login', () => {
    global.localStorage.setItem('token', 'mock_token')

    render(<Logout />)

    expect(global.localStorage.getItem('token')).toBeNull()
    expect(screen.getByTestId('navigate')).toHaveTextContent('/login')
  })
})
