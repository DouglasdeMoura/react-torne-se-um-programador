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
  rest.post<{ usuario: string; senha: string }>(
    'http://localhost:3000/api/login',
    (req, res, ctx) => {
      const { usuario, senha } = req.body

      if (usuario === 'admin' && senha === 'admin') {
        return res(
          ctx.status(200),
          ctx.json({ token: '35b49330-a4b0-4193-81f5-56bff5899c20' }),
        )
      }

      const errors = []

      if (usuario !== 'admin') {
        errors.push({
          name: 'usuario',
          reason: 'Usuário inválido',
        })
      }

      if (senha !== 'admin') {
        errors.push({
          name: 'senha',
          reason: 'Senha inválida',
        })
      }

      return res(
        ctx.status(401),
        ctx.set('Content-type', 'application/problem+json'),
        ctx.json({
          type: 'http://localhost:3000/api/login',
          title: 'Usuário ou senha inválidos',
          invalidParams: errors,
        }),
      )
    },
  ),
]
