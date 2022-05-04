import { useState } from "react"

type AcaoProps = {
  concluida?: boolean
} & React.ComponentProps<'button'>

/*
interface AcaoProps extends React.ComponentProps<'button'> {
  concluida?: boolean
}
*/

function Acao({ concluida, ...props }: AcaoProps) {
  return <button {...props}>{concluida ? '✅' : '❌'}</button>
}

function App() {
  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      nome: 'Estudar React',
      concluida: false
    },
    {
      id: 2,
      nome: 'Estudar TypeScript',
      concluida: false
    },
  ])

  const marcarComoConcluida = (id: number) => {
    setTarefas(tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return {
          ...tarefa,
          concluida: !tarefa.concluida
        }
      }
      return tarefa
    }))
  }

  return (
    <div>
      <h1>Tarefas</h1>

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
    </div>
  )
}

export default App
