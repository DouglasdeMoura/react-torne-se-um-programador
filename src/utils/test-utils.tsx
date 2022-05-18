import { QueryClient, QueryClientProvider } from "react-query"
import { render as testingLibraryRender, RenderOptions } from "@testing-library/react"

export * from '@testing-library/react'

export const render = (
  ui: React.ReactElement,
  { ...renderOptions }: RenderOptions = {}
) => testingLibraryRender(
  <QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>,
  renderOptions
)
