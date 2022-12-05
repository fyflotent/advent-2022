import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'advent-middleware/router';

export const trpc = createTRPCReact<AppRouter>();

export const TrpcProvider = trpc.Provider;
