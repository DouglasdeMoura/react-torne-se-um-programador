import { useMutation, useQuery, useQueryClient } from 'react-query'
import { client } from '../../api/client'

type Tarefa = {
  id: number
  nome: string
  concluida: boolean
}

const getTarefas = (): Promise<Tarefa[]> =>
  client.get('/tarefas').then(response => response.data)

const addTarefa = (nome: string) => 
  client.post('/tarefas', { nome }).then(response => response.data)


type UpdateTarefa = Partial<Pick<Tarefa, 'nome' | 'concluida'>> & Pick<Tarefa, 'id'>

const updateTarefa = ({ id, nome, concluida }: UpdateTarefa) =>
  client.patch(`/tarefas/${id}`, { nome, concluida }).then(response => response.data)

export const useTarefas = () => useQuery(
  'tarefas',
  getTarefas,
  { refetchOnWindowFocus: false }
)

export const useAddTarefa = () => {
  const mutation = useMutation(addTarefa)
  const queryClient = useQueryClient()

  return (nome: string) => mutation.mutate(
    nome,
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          'tarefas',
          (tarefas) => [...(tarefas as Tarefa[]), data]
        )
    }
  })
}

export const useUpdateTarefa = () => {
  const mutation = useMutation(updateTarefa)
  const queryClient = useQueryClient()

  return (tarefa: UpdateTarefa) => mutation.mutate(tarefa, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        'tarefas',
        (tarefas) => (tarefas as Tarefa[]).map(t => {
          if (t.id === data.id) {
            return data
          }

          return t
        })
      )
    },
  })
}
