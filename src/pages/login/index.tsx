import React from 'react'

import { Button } from '~/components/button'
import { Heading } from '~/components/heading'
import { Input } from '~/components/input'
import { serializeFormData } from '~/utils/serialize-form-data'

import { useLogin } from './login.hooks'

import styles from './login.module.css'

type FormElements = {
  email: HTMLInputElement
  password: HTMLInputElement
} & HTMLFormControlsCollection

type UsernameFormElement = {
  readonly elements: FormElements
} & HTMLFormElement

export const Login = () => {
  const mutation = useLogin()

  const handleOnSubmit = (event: React.FormEvent<UsernameFormElement>) => {
    event.preventDefault()
    const credentials = serializeFormData(event.currentTarget) as {
      usuario: string
      senha: string
    }

    mutation.mutate(credentials, {
      onSuccess: (data, variables, context) => {
        console.log(data)
      },
    })
  }

  return (
    <div className={styles.formContainer}>
      <Heading as="h2">Entre na sua conta</Heading>
      {mutation?.error?.response?.data?.title &&
        mutation?.error?.response?.data?.title}
      <form onSubmit={handleOnSubmit}>
        <Input
          label="Usuário"
          required
          error="Usuário inválido"
          name="usuario"
        />
        <Input
          label="Senha"
          type="password"
          required
          error="Digite sua senha"
          name="senha"
        />
        <Button>Entrar</Button>
      </form>
    </div>
  )
}
