import { useEffect, useState } from "react"
import { useFetch } from "./hooks"

type AcaoProps = {
  concluida?: boolean
} & React.ComponentProps<'button'>

type Tarefa = {
  id: number
  nome: string
  concluida: boolean
}

const getTarefas = (): Promise<Tarefa[]> => {
  return fetch('http://localhost:3000/tarefas').then(response => response.json())
}

const addTarefa = (nome: string) => {
  return fetch('http://localhost:3000/tarefas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome })
  }).then(response => response.json())
}

function Acao({ concluida, ...props }: AcaoProps) {
  return <button {...props}>{concluida ? '✅' : '❌'}</button>
}

function App() {
  const { dados, erro, carregando } = useFetch<Tarefa[]>(getTarefas)

  const [tarefas, setTarefas] = useState(dados)

  useEffect(() => {
    setTarefas(dados)
  }, [dados])

  const marcarComoConcluida = (id: number) => {
    setTarefas(tarefas?.map(tarefa => {
      if (tarefa.id === id) {
        return {
          ...tarefa,
          concluida: !tarefa.concluida
        }
      }
      return tarefa
    }))
  }

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    addTarefa(formData.get('nome') as string).then(() => {
      getTarefas().then(setTarefas)
    })
  }

  if (carregando) {
    return <p>Carregando...</p>
  }

  if (erro) {
    return <p>Ocorreu um erro durante a listagem das tarefas.</p>
  }

  return (
    <div>
      <h1>Tarefas</h1>
      {tarefas && Array.isArray(tarefas) ? (
        <ul>
          {tarefas.map(tarefa => (
            <li key={tarefa.id}>
              {tarefa.nome}
              <Acao
                concluida={tarefa.concluida}
                onClick={() => {
                  marcarComoConcluida(tarefa.id)
                }}
              />
            </li>
          ))}
        </ul>
      ) : null}
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="nome" />
        <button type="submit">Adicionar tarefa</button>
      </form>
    </div>
  )
}

export default App
