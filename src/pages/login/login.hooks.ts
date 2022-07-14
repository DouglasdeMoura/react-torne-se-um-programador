import { useMutation } from 'react-query'

import { client } from '~/api/client'

import axios, { AxiosError } from 'axios'

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
    .post<User>('/api/login', {
      usuario,
      senha,
    })
    .then((res) => res.data)
    .catch((err: Error | AxiosError<ProblemDetails>) => {
      if (axios.isAxiosError(err)) {
        throw err?.response?.data
      } else {
        throw err
      }
    })

export const useLogin = () =>
  useMutation<User, ProblemDetails, Credentials>(login)
