import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter, createContext } from './router';
import express from 'express';
import cors from 'cors';
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.listen(4000);
