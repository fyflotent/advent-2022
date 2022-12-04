import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter, createContext } from "./router";
import express from "express";

const app = express();
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.listen(4000);
