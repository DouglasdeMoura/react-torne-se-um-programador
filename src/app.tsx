import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Routes, Route, Outlet } from 'react-router-dom'

import { Loading } from '~/components/loading/loading'
import { Login } from '~/pages/login'
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
          <Container>
            <AppRoutes />
          </Container>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

type ContainerProps = {
  children?: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="container">
    {children}
    <React.Suspense fallback={<Loading />}>
      <Outlet />
    </React.Suspense>
  </div>
)

const AppRoutes = () => (
  <Routes>
    <Route path="tasks" element={<Tasks />} />
    <Route path="login" element={<Login />} />
  </Routes>
)
