import { client } from "../../api/client"

type Tarefa = {
  id: number
  nome: string
  concluida: boolean
}

export const getTarefas = (): Promise<Tarefa[]> =>
  client.get('/tarefas').then(response => response.data)

export const addTarefa = (nome: string) => 
  client.post('/tarefas', { nome }).then(response => response.data)


type UpdateTarefa = Partial<Pick<Tarefa, 'nome' | 'concluida'>> & Pick<Tarefa, 'id'>

export const updateTarefa = ({ id, nome, concluida }: UpdateTarefa) =>
  client.patch(`/tarefas/${id}`, { nome, concluida }).then(response => response.data)

