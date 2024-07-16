// providers.tsx
'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

interface ProvidersProps {
    children: any
  }
  export default function Providers({ children }: ProvidersProps) {
    const [queryClient] = useState(() => new QueryClient())
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }