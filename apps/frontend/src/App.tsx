import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { Page } from './components/Page';
import { trpc, TrpcProvider } from './utils/trpc';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:4000/trpc',
        }),
      ],
    })
  );

  return (
    <TrpcProvider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Page />
      </QueryClientProvider>
    </TrpcProvider>
  );
};

export default App;
