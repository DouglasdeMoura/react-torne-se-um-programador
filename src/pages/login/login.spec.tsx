/* eslint-disable jest/no-commented-out-tests */
import { render, screen, waitFor } from '~/utils/test-utils'

import Login from './index.page'

const useRouter = vi.fn()
const signIn = vi.fn()

vi.mock('next/router', () => ({
  ...vi.importActual('next/router'),
  useRouter: () => useRouter.mockImplementation(() => ({ query: {} })),
}))

vi.mock('next-auth/react', () => ({
  ...vi.importActual('next-auth/react'),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  signIn: (...args) => signIn(...args),
}))

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

  // it('deve exibir a mensagem de erro quando as credenciais forem inválidas', async () => {
  //   // query.mockImplementationOnce(() => ({ error: 'CredentialsSignin' }))

  //   const { user } = render(<Login />)

  //   await user.type(screen.getByLabelText('Usuário'), 'teste')
  //   await user.type(screen.getByLabelText('Senha'), 'teste')
  //   await user.click(screen.getByText('Entrar'))

  //   expect(signIn).toHaveBeenCalledWith('credentials', {
  //     callbackUrl: '/dashboard',
  //     password: 'teste',
  //     redirect: true,
  //     username: 'teste',
  //   })

  //   await waitFor(() => {
  //     expect(screen.getByText('Usuário ou senha inválidos')).toBeInTheDocument()
  //   })
  // })

  // it('deve fazer o login do usuário e redirecionar para /dashboard', async () => {
  //   const router = mockNextRouter({ pathname: '/login' })
  //   const { user } = render(<Login />)

  //   await user.type(screen.getByLabelText('Usuário'), 'admin')
  //   await user.type(screen.getByLabelText('Senha'), 'admin')
  //   user.click(screen.getByText('Entrar'))

  //   await waitFor(() => {
  //     expect(router.push).toHaveBeenCalledWith('/dashboard')
  //   })
  // })

  // it('deve redirecionar o usuário para a URL presente em ?redirectPath=', async () => {
  //   const router = mockNextRouter({
  //     pathname: '/login?redirectPath=/dashboard',
  //   })
  //   const { user } = render(<Login />)

  //   await user.type(screen.getByLabelText('Usuário'), 'admin')
  //   await user.type(screen.getByLabelText('Senha'), 'admin')
  //   user.click(screen.getByText('Entrar'))

  //   await waitFor(() => {
  //     expect(router.push).toHaveBeenCalledWith('/dashboard')
  //   })
  // })
})
