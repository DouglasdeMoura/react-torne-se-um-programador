import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Routes, Route } from 'react-router-dom'

import { Loading } from '~/components/loading/loading'
import { Tasks } from '~/pages/tasks'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      suspense: true,
    },
  },
})

export const App = () => (
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
          <AppRoutes />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

const AppRoutes = () => (
  <div className="container">
    <Routes>
      <Route
        path="tasks"
        element={
          <React.Suspense fallback={<Loading />}>
            <Tasks />
          </React.Suspense>
        }
      />
    </Routes>
  </div>
)
