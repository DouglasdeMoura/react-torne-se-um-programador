import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' 
import { QueryClient, QueryClientProvider } from 'react-query'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
