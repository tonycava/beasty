import { t } from '$lib/trpc/t';
import { z } from 'zod';
import { GetUserInfoUseCase } from '../../modules/profile/usescases/GetUserInfoUseCase';
import { SQLiteUserProfileRepository } from '../../modules/profile/repositories/SQLiteUserProfileRepository';
import { SubscriptionRouter } from '../../modules/beasty/routes/SubscriptionRouter';
import { AuthRouter } from '$auth/routes/AuthRouter';

export const router = t.router({
	getUser: t.procedure
	.input(
		z.string().uuid()
	)
	.query(async ({input}) => {
		const getUserInfoUseCase = await GetUserInfoUseCase({
			userRepository: SQLiteUserProfileRepository()
		})
		.execute(input);

		if (getUserInfoUseCase.isSuccess) {
			return getUserInfoUseCase.data
		}
		return null;
	}),
	authRouter: AuthRouter,
	subscriptionRouter: SubscriptionRouter
});

export type Router = typeof router;
export const createCaller = t.createCallerFactory(router);
