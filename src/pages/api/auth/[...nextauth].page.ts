import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Usuário', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials, req) {
        // const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        const user = await prisma.user.findFirst({
          where: {
            AND: {
              email: credentials?.username,
              // TODO: aplicar um hash à senha (nunca salvar a senha em texto plano)
              password: credentials?.password,
            },
          },
        })

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
}

export default NextAuth(authOptions)
