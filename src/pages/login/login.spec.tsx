import { mockNextRouter, render, screen, waitFor } from '~/utils/test-utils'

import Login from './index.page'

describe('<Login />', () => {
  it('não deve permitir o envio do formulário sem um usuário e senha', async () => {
    const { user } = render(<Login />)

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
    const { user } = render(<Login />)

    await user.type(screen.getByLabelText('Usuário'), 'teste')
    await user.type(screen.getByLabelText('Senha'), 'teste')
    user.click(screen.getByText('Entrar'))

    await waitFor(() => {
      expect(screen.getByText('Usuário ou senha inválidos')).toBeInTheDocument()
    })
  })

  it('deve fazer o login do usuário e redirecionar para /dashboard', async () => {
    const router = mockNextRouter({ pathname: '/login' })
    const { user } = render(<Login />)

    await user.type(screen.getByLabelText('Usuário'), 'admin')
    await user.type(screen.getByLabelText('Senha'), 'admin')
    user.click(screen.getByText('Entrar'))

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('deve redirecionar o usuário para a URL presente em ?redirectPath=', async () => {
    const router = mockNextRouter({
      pathname: '/login?redirectPath=/dashboard',
    })
    const { user } = render(<Login />)

    await user.type(screen.getByLabelText('Usuário'), 'admin')
    await user.type(screen.getByLabelText('Senha'), 'admin')
    user.click(screen.getByText('Entrar'))

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/dashboard')
    })
  })
})
