import { useMutation } from 'react-query'

import { client } from '~/api/client'

import { AxiosResponse } from 'axios'

type ProblemDetails = {
  type?: string
  title: string
  status: number
  detail?: string
  instance: string
  invalidParams?: {
    name: string
    reason: string
  }[]
}

type User = {
  id: number
  nome: string
  email: string
  token: string
}

type Credentials = { usuario: string; senha: string }

const login = ({ usuario, senha }: Credentials) =>
  client
    .post<User, AxiosResponse<User, ProblemDetails>>('/api/login', {
      usuario,
      senha,
    })
    .then((res) => res.data)

export const useLogin = () => useMutation(login)
