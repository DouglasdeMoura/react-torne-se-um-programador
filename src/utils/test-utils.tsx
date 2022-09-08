import {
  render as testingLibraryRender,
  RenderOptions,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// eslint-disable-next-line import-helpers/order-imports
import type { NextRouter } from 'next/router'

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

const useRouterSpy = vi.spyOn(require('next/router'), 'useRouter')

function createMockRouter(overrides: Partial<NextRouter>) {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    back: vi.fn(),
    beforePopState: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    reload: vi.fn(),
    replace: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    isPreview: false,
    ...overrides,
  }
}

export function mockNextRouter(overrides: Partial<NextRouter> = {}) {
  const mockRouter = createMockRouter(overrides)
  useRouterSpy.mockReturnValue(mockRouter)
  return mockRouter
}
