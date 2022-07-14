// import * as reactRouterDom from 'react-router-dom'

import { render, userEvent, screen, waitFor } from '~/utils/test-utils'

import { Login } from '.'

// TODO: descobrir como mockar o useNavigate
// const navigate = vitest.fn()
// vi.spyOn(reactRouterDom, 'useNavigate').mockImplementation(() => navigate)

describe('<Login />', () => {
  it('não deve permitir o envio do formulário sem um usuário e senha', async () => {
    render(<Login />)

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
    render(<Login />)

    userEvent.type(screen.getByLabelText('Usuário'), 'teste')
    userEvent.type(screen.getByLabelText('Senha'), 'teste')
    userEvent.click(screen.getByText('Entrar'))

    await waitFor(() => {
      expect(screen.getByText('Usuário ou senha inválidos')).toBeInTheDocument()
    })
  })

  // it('deve fazer o login do usuário', async () => {
  //   render(<Login />)

  //   userEvent.type(screen.getByLabelText('Usuário'), 'admin')
  //   userEvent.type(screen.getByLabelText('Senha'), 'admin')
  //   userEvent.click(screen.getByText('Entrar'))

  //   await waitFor(() => {
  //     expect(navigate).toHaveBeenCalledWith('/dashboard')
  //   })
  // })
})
