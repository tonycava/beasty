import { t } from '$lib/trpc/t';
import { AuthRouter } from '$auth/routes/AuthRouter';

export const router = t.router({
	greeting: t.procedure.query(async () => {
		return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
	}),
	authRouter: AuthRouter
});

export type Router = typeof router;
export const createCaller = t.createCallerFactory(router);
