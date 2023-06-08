import { QueryClient, QueryClientProvider } from 'react-query'
import { ChildrenProps } from '../shared/components'

export const queryClient = new QueryClient()

export const QueryProvider = ({ children }: ChildrenProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
