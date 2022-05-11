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
  rest.get('http://localhost:3000/tarefas', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(tarefas),
    )
  }),
  rest.post<{ nome: string }>('http://localhost:3000/tarefas', (req, res, ctx) => {
    if (!req.body.nome) {
      return res(
        ctx.status(422),
        ctx.json({
          error: 'O nome da tarefa é obrigatório'
        }),
      )
    }

    const tarefa = {
      id: tarefas.length + 1,
      nome: req.body.nome,
      concluida: false
    }

    tarefas.push(tarefa)
    return res(
      ctx.status(201),
      ctx.json(tarefa),
    )
  })
]
