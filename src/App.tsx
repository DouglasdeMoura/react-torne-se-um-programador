const tarefas = [
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
]

function App() {
  return (
    <div>
      <h1>Tarefas</h1>

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>
            {tarefa.nome}
            {tarefa.concluida ? ' ✅' : ' ❌'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
