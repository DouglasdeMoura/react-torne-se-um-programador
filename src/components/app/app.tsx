import { useRef } from 'react'

import { Button } from '~/components/button'
import { Heading } from '~/components/heading'

import { useAddTarefa, useTarefas, useUpdateTarefa } from './app.hooks'

export function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const addTarefa = useAddTarefa()

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    addTarefa(formData.get('nome') as string)

    if (inputRef.current?.value) {
      inputRef.current.value = ''
    }
  }

  return (
    <div>
      <Heading>Tarefas</Heading>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="nome">Adicionar tarefa</label>
        <input type="text" name="nome" id="nome" ref={inputRef} />

        <Button type="submit">Adicionar</Button>
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
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <label htmlFor={`tarefa-${tarefa.id}`}>
                <input
                  id={`tarefa-${tarefa.id}`}
                  type="checkbox"
                  onClick={() =>
                    updateTarefa({
                      id: tarefa.id,
                      concluida: !tarefa.concluida,
                    })
                  }
                  defaultChecked={tarefa.concluida}
                />
                {tarefa.concluida ? (
                  <del data-testid={`tarefa-concluida-${tarefa.id}`}>
                    {tarefa.nome}
                  </del>
                ) : (
                  tarefa.nome
                )}
              </label>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}
