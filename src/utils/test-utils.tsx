import { QueryClient, QueryClientProvider } from 'react-query'

import {
  render as testingLibraryRender,
  RenderOptions,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export * from '@testing-library/react'

export const render = (
  ui: React.ReactElement,
  { ...renderOptions }: RenderOptions = {},
) => ({
  user: userEvent.setup(),
  ...testingLibraryRender(
    <QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>,
    renderOptions,
  ),
})
