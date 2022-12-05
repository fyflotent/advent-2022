import { z } from 'zod';
import { days } from './days';
import * as trpcExpress from '@trpc/server/adapters/express';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';

export const createContext = (
  _options: trpcExpress.CreateExpressContextOptions
) => ({});

type Context = inferAsyncReturnType<typeof createContext>;

const { router, procedure } = initTRPC.context<Context>().create();

const typedObjectKeys = <T extends object>(x: T): Array<keyof T> =>
  [...Object.keys(x)] as Array<keyof T>;

export const appRouter = router({
  getDayResult: procedure
    .input(
      z.object({
        day: z.enum(['day1', ...typedObjectKeys(days)]),
        part: z.enum(['part1', 'part2']),
      })
    )
    .query((req) => {
      const { day, part } = req.input;

      return days[day][part]();
    }),
  getDayResultByNumber: procedure
    .input(
      z.object({ dayNumber: z.number(), part: z.enum(['part1', 'part2']) })
    )
    .query((req) => {
      const { dayNumber, part } = req.input;
      const dayKey = typedObjectKeys(days).find(
        (day) => day === `day${dayNumber}`
      );
      const dayResult = dayKey && days[dayKey][part]();
      return dayResult;
    }),
  getDays: procedure.query(() => {
    return typedObjectKeys(days);
  }),
});

export type AppRouter = typeof appRouter;
