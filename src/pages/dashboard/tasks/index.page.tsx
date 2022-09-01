import { IsAuthenticated } from '~/components/is-authenticated'
import { Menu } from '~/components/menu'

import { Tasks } from './tasks'

export default function Page() {
  return (
    <IsAuthenticated>
      <Menu>
        <Tasks />
      </Menu>
    </IsAuthenticated>
  )
}
