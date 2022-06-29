import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Loading } from '~/components/loading/loading'
import { Tasks } from '~/components/tasks'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      suspense: true,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="container">
      <QueryClientProvider client={queryClient}>
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
              <React.Suspense fallback={<Loading />}>
                <Tasks />
              </React.Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  </React.StrictMode>,
)
