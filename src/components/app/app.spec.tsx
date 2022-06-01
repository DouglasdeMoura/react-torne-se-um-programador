import { render, screen, waitFor, userEvent } from '../../utils/test-utils'

import { App } from './app'

describe('<App />', () => {
  it('deve renderizar o componente', async () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Tarefas' })).toBeInTheDocument()

    waitFor(() => {
      expect(screen.getByText('Estudar React')).toBeInTheDocument()
      expect(screen.getByText('Estudar TypeScript')).toBeInTheDocument()
    })

    await userEvent.type(screen.getByLabelText('Adicionar tarefa'), 'Estudar GraphQL')
    await userEvent.click(screen.getByText('Adicionar'))

    waitFor(() => {
      expect(screen.getByText('Estudar GraphQL')).toBeInTheDocument()
    })
  })
})
