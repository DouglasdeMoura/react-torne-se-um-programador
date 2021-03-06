import React, { useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Button } from '~/components/button'
import { Heading } from '~/components/heading'
import { Input } from '~/components/input'
import { serializeFormData } from '~/utils/serialize-form-data'
import { setToken } from '~/utils/token'

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
  const errorRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const setErrorHiddenStatus = (status: boolean) => {
    if (errorRef.current) {
      errorRef.current.hidden = status
    }
  }

  const handleOnSubmit = (event: React.FormEvent<UsernameFormElement>) => {
    event.preventDefault()
    const credentials = serializeFormData(event.currentTarget) as {
      usuario: string
      senha: string
    }

    mutation.mutate(credentials, {
      onSuccess: (data) => {
        setToken(data.token)
        const redirectPath = searchParams.get('redirectPath')

        navigate(redirectPath ? redirectPath : '/dashboard')
      },
      onError: () => {
        setErrorHiddenStatus(false)
      },
    })
  }

  return (
    <div className={styles.formContainer}>
      <Heading as="h2">Entre na sua conta</Heading>

      <form onSubmit={handleOnSubmit}>
        <div className={styles.errorContainer} ref={errorRef} hidden>
          {mutation?.error?.title && mutation.error.title}
        </div>

        <Input
          label="Usuário"
          required
          error="Usuário inválido"
          name="usuario"
          onChange={() => setErrorHiddenStatus(true)}
          id="usuario"
        />
        <Input
          label="Senha"
          type="password"
          required
          error="Digite sua senha"
          name="senha"
          id="senha"
          onChange={() => setErrorHiddenStatus(true)}
        />
        <Button>Entrar</Button>
      </form>
    </div>
  )
}
