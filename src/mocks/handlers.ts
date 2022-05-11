import { rest } from 'msw'

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

export const handlers = [
  rest.get('/tarefas', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(tarefas),
    )
  }),
]
