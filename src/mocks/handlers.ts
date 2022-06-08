import { rest } from 'msw'

let tarefas = [
  {
    id: 1,
    nome: 'Estudar React',
    concluida: false,
  },
  {
    id: 2,
    nome: 'Estudar TypeScript',
    concluida: false,
  },
]

const getTarefa = (id: number) => tarefas.find((t) => t.id === id)

export const handlers = [
  rest.get('http://localhost:3000/tarefas', async (req, res, ctx) => {
    if (req.url.searchParams.get('error') === 'true') {
      return res(ctx.status(500))
    }

    return res(ctx.status(200), ctx.json(tarefas))
  }),
  rest.post<{ nome: string }>(
    'http://localhost:3000/tarefas',
    (req, res, ctx) => {
      if (!req.body.nome) {
        return res(
          ctx.status(422),
          ctx.json({
            error: 'O nome da tarefa é obrigatório',
          }),
        )
      }

      const tarefa = {
        id: tarefas.length + 1,
        nome: req.body.nome,
        concluida: false,
      }

      tarefas.push(tarefa)
      return res(ctx.status(201), ctx.json(tarefa))
    },
  ),
  rest.patch<{ nome?: string; concluida?: boolean }>(
    'http://localhost:3000/tarefas/:id',
    (req, res, ctx) => {
      const id = Number(req.params.id)
      const tarefa = getTarefa(id)

      if (!tarefa) {
        return res(
          ctx.status(404),
          ctx.json({
            error: 'Tarefa não encontrada',
          }),
        )
      }

      tarefas = tarefas?.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            ...req.body,
          }
        }

        return t
      })

      return res(ctx.status(200), ctx.json(getTarefa(id)))
    },
  ),
]
