import { useQuery } from 'react-query'
import { addTarefa, getTarefas, updateTarefa } from './services'

export function App() {
  const { data: tarefas, error: erro, isLoading: carregando, refetch } = useQuery('getTarefas', getTarefas)

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    addTarefa(formData.get('nome') as string).then(() => {
      refetch()
    })
  }

  return (
    <div>
      <h1>Tarefas</h1>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="nome" />
        <button type="submit">Adicionar tarefa</button>
      </form>
      {carregando ? <p>Carregando...</p> : null}
      {erro ? <p>Ocorreu um erro durante a listagem das tarefas.</p> : null}
      {tarefas && Array.isArray(tarefas) ? (
        <ul>
          {tarefas.map(tarefa => (
            <li key={tarefa.id}>
              <input
                type="checkbox"
                onClick={() => updateTarefa({
                  id: tarefa.id,
                  concluida: !tarefa.concluida
                }).then(() => refetch())}
              />
              {tarefa.concluida ? <del>{tarefa.nome}</del> : tarefa.nome}
            </li>
          ))}
        </ul>
      ) : null}
      
    </div>
  )
}
