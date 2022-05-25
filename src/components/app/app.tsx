import { useAddTarefa, useTarefas, useUpdateTarefa } from './app.hooks'

export function App() {
  const addTarefa = useAddTarefa()

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    addTarefa(formData.get('nome') as string)
  }

  return (
    <div>
      <h1>Tarefas</h1>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="nome" />
        <button type="submit">Adicionar tarefa</button>
      </form>
      <ListaDeTarefas />
    </div>
  )
}

const ListaDeTarefas = () => {
  const { data: tarefas } = useTarefas()
  const updateTarefa = useUpdateTarefa()

  return (
    <>
      {Array.isArray(tarefas) ? (
        <ul>
          {tarefas.map(tarefa => (
            <li key={tarefa.id}>
              <input
                type="checkbox"
                onClick={() => updateTarefa({ id: tarefa.id, concluida: !tarefa.concluida })}
                defaultChecked={tarefa.concluida}
              />
              {tarefa.concluida ? <del>{tarefa.nome}</del> : tarefa.nome}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}
