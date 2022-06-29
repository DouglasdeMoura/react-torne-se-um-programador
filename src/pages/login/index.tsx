import React from 'react'

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
  const handleOnSubmit = (event: React.FormEvent<UsernameFormElement>) => {
    event.preventDefault()

    // event.currentTarget.elements.email.value

    console.log(serializeFormData(event.currentTarget))
  }

  return (
    <div className={styles.formContainer}>
      <Heading as="h2">Entre na sua conta</Heading>

      <form onSubmit={handleOnSubmit}>
        <Input
          label="E-mail"
          type="email"
          required
          error="E-mail inválido"
          name="email"
        />
        <Input
          label="Senha"
          type="password"
          required
          error="Digite sua senha"
          name="password"
        />
        <Button>Entrar</Button>
      </form>
    </div>
  )
}
