import { useSession, signIn, signOut } from 'next-auth/react'

import { Button } from '~/components/button'

export const LoginButton: React.FC = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Olá {session?.user?.email} <br />
        <Button onClick={() => signOut()}>Sair</Button>
      </>
    )
  }
  return (
    <>
      <Button onClick={() => signIn()}>Entrar</Button>
    </>
  )
}
