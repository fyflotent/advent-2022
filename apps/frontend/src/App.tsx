import { AppBar } from './components/AppBar';
import { httpBatchLink } from '@trpc/client';
import { Page } from './components/Page';
import { trpc, TrpcProvider } from './utils/trpc'
import { useState } from 'react';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:4000/trpc',
        }),
      ],
    }),
  );

  return (
    <TrpcProvider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppBar>
          <Page />
        </AppBar>
      </QueryClientProvider>
    </TrpcProvider >
  );
}

export default App;
