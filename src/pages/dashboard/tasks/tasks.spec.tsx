import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '~/utils/test-utils'

import { Tasks } from './tasks'

describe('<Tasks />', () => {
  it('deve renderizar o componente, adicionar uma tarefa e marcá-la e desmarcá-la como concluída', async () => {
    const { user } = render(<Tasks />)

    expect(
      await screen.findByRole('heading', { name: 'Tarefas' }),
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Estudar React')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Estudar TypeScript')).toBeInTheDocument()
    })

    await user.type(
      screen.getByLabelText('Adicionar tarefa'),
      'Estudar GraphQL',
    )
    await user.click(screen.getByText('Adicionar'))

    await waitFor(() => {
      expect(screen.getByText('Estudar GraphQL')).toBeInTheDocument()
    })

    await user.click(screen.getByText('Estudar GraphQL'))

    await waitFor(() => {
      expect(screen.getByTestId('tarefa-concluida-3')).toBeInTheDocument()
    })

    user.click(screen.getByText('Estudar GraphQL'))

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('tarefa-concluida-3'),
    )
  })
})
