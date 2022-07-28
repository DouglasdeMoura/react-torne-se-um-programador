import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { render, userEvent, screen, waitFor } from '~/utils/test-utils'

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
    render(<App />)

    userEvent.tab()
    userEvent.tab()
    userEvent.tab()

    await waitFor(() => {
      expect(screen.getByText('Usuário inválido')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Digite sua senha')).toBeInTheDocument()
    })
  })

  it('deve exibir a mensagem de erro quando as credenciais forem inválidas', async () => {
    render(<App />)

    await userEvent.type(screen.getByLabelText('Usuário'), 'teste')
    await userEvent.type(screen.getByLabelText('Senha'), 'teste')
    userEvent.click(screen.getByText('Entrar'))

    await waitFor(() => {
      expect(screen.getByText('Usuário ou senha inválidos')).toBeInTheDocument()
    })
  })

  it('deve fazer o login do usuário e redirecionar para /dashboard', async () => {
    render(<App />)

    await userEvent.type(screen.getByLabelText('Usuário'), 'admin')
    await userEvent.type(screen.getByLabelText('Senha'), 'admin')
    userEvent.click(screen.getByText('Entrar'))

    await waitFor(() => {
      expect(screen.getByTestId('dashboard')).toBeInTheDocument()
    })
  })

  it('deve redirecionar o usuário para a URL presente em ?redirectPath=', async () => {
    render(<App initialEntry="/?redirectPath=/redirect" />)

    await userEvent.type(screen.getByLabelText('Usuário'), 'admin')
    await userEvent.type(screen.getByLabelText('Senha'), 'admin')
    userEvent.click(screen.getByText('Entrar'))

    await waitFor(() => {
      expect(screen.getByTestId('redirect')).toBeInTheDocument()
    })
  })
})
