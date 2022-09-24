import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'

import { Button } from '~/components/button'
import { Heading } from '~/components/heading'
import { Input } from '~/components/input'
import { serializeFormData } from '~/utils/serialize-form-data'

import styles from './login.module.css'

type FormElements = {
  email: HTMLInputElement
  password: HTMLInputElement
} & HTMLFormControlsCollection

type UsernameFormElement = {
  readonly elements: FormElements
} & HTMLFormElement

export const Login = () => {
  const errorRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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

    const redirectPath = router.query?.redirectPath as string

    signIn('credentials', {
      redirect: true,
      callbackUrl: redirectPath ? redirectPath : '/dashboard',
      username: credentials.usuario,
      password: credentials.senha,
    })
  }

  return (
    <div className={styles.formContainer}>
      <Heading as="h2">Entre na sua conta</Heading>

      <form onSubmit={handleOnSubmit}>
        <div
          className={styles.errorContainer}
          ref={errorRef}
          hidden={!router.query.error}
        >
          {router.query.error === 'CredentialsSignin'
            ? 'Usuário ou senha inválidos'
            : null}
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
