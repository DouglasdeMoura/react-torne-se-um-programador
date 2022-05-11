import { render, screen } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  it('deve renderizar o componente',  () => {
    const { container } = render(<App />)

    expect(screen.getByText('Tarefas')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tarefas' })).toBeInTheDocument()
    expect(container).toMatchSnapshot()

    expect(screen.getByText('Estudar React')).toBeInTheDocument()
    expect(screen.getByText('Estudar TypeScript')).toBeInTheDocument()
  })
})
