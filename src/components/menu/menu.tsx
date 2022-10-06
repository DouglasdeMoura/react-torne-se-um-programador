import Link from 'next/link'
import { Suspense } from 'react'

import { Loading } from '../loading/loading'
import LoginButton from '../login-button'

import styles from './menu.module.css'

type MenuProps = {
  children?: React.ReactNode
}

export const Menu: React.FC<MenuProps> = ({ children }) => (
  <div className={styles.wrapper}>
    <aside className={styles.menu}>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Início</Link>
          </li>
          <li>
            <Link href="/dashboard/tasks">Tarefas</Link>
          </li>
          <li>
            <Link href="/logout">Sair</Link>
          </li>
        </ul>
        <LoginButton />
      </nav>
    </aside>
    <main className="container">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  </div>
)
