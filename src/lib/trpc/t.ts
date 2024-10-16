import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

export const t = initTRPC.context<Context>().create({
	transformer: superjson
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;