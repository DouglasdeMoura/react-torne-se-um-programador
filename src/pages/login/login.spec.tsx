import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { render, screen, waitFor } from '~/utils/test-utils'

import { Login } from '.'

const App = ({ initialEntry = '/' }: { initialEntry?: string }) => (
  <MemoryRouter initialEntries={[initialEntry]}>
    <Routes>
      <Route path="/dashboard" element={<div data-testid="dashboard" />} />
      <Route path="/redirect" element={<div data-testid="redirect" />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </MemoryRouter>
)

describe('<Login />', () => {
  it('não deve permitir o envio do formulário sem um usuário e senha', async () => {
    const { user } = render(<App />)

    user.tab()
    user.tab()
    user.tab()

    await waitFor(() => {
      expect(screen.getByText('Usuário inválido')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Digite sua senha')).toBeInTheDocument()
    })
  })

  it('deve exibir a mensagem de erro quando as credenciais forem inválidas', async () => {
    const { user } = render(<App />)

    await user.type(screen.getByLabelText('Usuário'), 'teste')
    await user.type(screen.getByLabelText('Senha'), 'teste')
    user.click(screen.getByText('Entrar'))

    await waitFor(() => {
      expect(screen.getByText('Usuário ou senha inválidos')).toBeInTheDocument()
    })
  })

  it('deve fazer o login do usuário e redirecionar para /dashboard', async () => {
    const { user } = render(<App />)

    await user.type(screen.getByLabelText('Usuário'), 'admin')
    await user.type(screen.getByLabelText('Senha'), 'admin')
    user.click(screen.getByText('Entrar'))

    await waitFor(() => {
      expect(screen.getByTestId('dashboard')).toBeInTheDocument()
    })
  })

  it('deve redirecionar o usuário para a URL presente em ?redirectPath=', async () => {
    const { user } = render(<App initialEntry="/?redirectPath=/redirect" />)

    await user.type(screen.getByLabelText('Usuário'), 'admin')
    await user.type(screen.getByLabelText('Senha'), 'admin')
    user.click(screen.getByText('Entrar'))

    await waitFor(() => {
      expect(screen.getByTestId('redirect')).toBeInTheDocument()
    })
  })
})
