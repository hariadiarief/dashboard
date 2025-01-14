import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router'
import { Toaster } from './components/ui/toaster.tsx'
import { AuthProvider } from './context/auth/authContext.tsx'
import RoutesApp from './router.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <BrowserRouter>
          <RoutesApp />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
)
