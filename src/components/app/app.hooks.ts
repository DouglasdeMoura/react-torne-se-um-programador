import { useQuery } from 'react-query'
import { getTarefas } from './app.services'

export const useTarefas = () => useQuery(
  'getTarefas',
  getTarefas,
  { refetchOnWindowFocus: false }
)