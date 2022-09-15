import '../styles/pico.min.css'

import type { AppProps } from 'next/app'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Loading } from '~/components/loading/loading'

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

type ContainerProps = {
  children?: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
)

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            suspense: true,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Hydrate state={pageProps.dehydratedState}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => (
                <div>
                  <h3>Ocorreu um erro!</h3>
                  <button onClick={() => resetErrorBoundary()}>
                    Tente novamente
                  </button>
                  <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
                </div>
              )}
              onReset={reset}
            >
              <Container>
                <Component {...pageProps} />
              </Container>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
