import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/app'
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Loading } from './components/loading/loading'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ margin: '0 auto', maxWidth: '568px' }}>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => (
                <div>
                  <h3>Ocorreu um erro!</h3>
                  <button onClick={() => resetErrorBoundary()}>Tente novamente</button>
                  <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
                </div>
              )}
              onReset={reset}
            >
              <React.Suspense fallback={<Loading />}>
                <App />
              </React.Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  </React.StrictMode>
)
