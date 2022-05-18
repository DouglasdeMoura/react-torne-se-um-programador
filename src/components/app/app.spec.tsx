import { render, screen, waitFor } from '../../utils/test-utils'
import { App } from './app'

describe('<App />', () => {
  it('deve renderizar o componente', async () => {
    render(<App />)

    expect(screen.getByText('Tarefas')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tarefas' })).toBeInTheDocument()

    waitFor(() => {
      expect(screen.getByText('Estudar React')).toBeInTheDocument()
      expect(screen.getByText('Estudar TypeScript')).toBeInTheDocument()
    })
  })
})
