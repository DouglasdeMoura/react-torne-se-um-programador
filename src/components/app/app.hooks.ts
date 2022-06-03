import { useMutation, useQuery, useQueryClient } from 'react-query'
import { client } from '../../api/client'

type Tarefa = {
  id: number
  nome: string
  concluida: boolean
}

type UpdateTarefa = Partial<Pick<Tarefa, 'nome' | 'concluida'>> & Pick<Tarefa, 'id'>

const getTarefas = () =>
  client.get<Tarefa[]>('/tarefas').then(response => response.data)

const addTarefa = (nome: string) => 
  client.post<Tarefa>('/tarefas', { nome }).then(response => response.data)

const updateTarefa = ({ id, nome, concluida }: UpdateTarefa) =>
  client.patch<Tarefa>(`/tarefas/${id}`, { nome, concluida }).then(response => response.data)

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
        queryClient.setQueryData<Tarefa[]>(
          'tarefas',
          (tarefas) => tarefas ? [...tarefas, data] : [data]
        )
    }
  })
}

export const useUpdateTarefa = () => {
  const mutation = useMutation(updateTarefa)
  const queryClient = useQueryClient()

  return (tarefa: UpdateTarefa) => mutation.mutate(tarefa, {
    onSuccess: (data) => {
      queryClient.setQueryData<Tarefa[]>(
        'tarefas',
        (tarefas) => {
          if (!tarefas) return [data]

          return tarefas.map(t => {
            if (t.id === data.id) {
              return data
            }
  
            return t
          })
        }
      )
    },
  })
}
