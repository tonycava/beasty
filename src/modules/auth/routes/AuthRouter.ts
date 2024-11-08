import { t } from '$lib/trpc/t';
import { LogoutUseCase } from '$auth/usecases/LogoutUser';

export const AuthRouter = t.router({
	logout: t.procedure.mutation(async ({ctx}) => {
		await LogoutUseCase({
			cookieProvider: {
				remove: ctx.event.cookies.delete,
				get: ctx.event.cookies.get
			}
		}).execute();
	})
});