import {
  render,
  screen,
  waitFor,
  userEvent,
  waitForElementToBeRemoved,
} from '../../utils/test-utils'
import { App } from './app'

describe('<App />', () => {
  it('deve renderizar o componente, adicionar uma tarefa e marcá-la e desmarcá-la como concluída', async () => {
    render(<App />)

    expect(
      await screen.findByRole('heading', { name: 'Tarefas' }),
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Estudar React')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Estudar TypeScript')).toBeInTheDocument()
    })

    await userEvent.type(
      screen.getByLabelText('Adicionar tarefa'),
      'Estudar GraphQL',
    )
    await userEvent.click(screen.getByText('Adicionar'))

    await waitFor(() => {
      expect(screen.getByText('Estudar GraphQL')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText('Estudar GraphQL'))

    await waitFor(() => {
      expect(screen.getByTestId('tarefa-concluida-3')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText('Estudar GraphQL'))

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('tarefa-concluida-3'),
    )
  })
})
