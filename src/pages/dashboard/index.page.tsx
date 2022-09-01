import { IsAuthenticated } from '~/components/is-authenticated'
import { Menu } from '~/components/menu'

import { Dashboard } from './dashboard'

export default function Page() {
  return (
    <IsAuthenticated>
      <Menu>
        <Dashboard />
      </Menu>
    </IsAuthenticated>
  )
}
