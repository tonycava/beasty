import { t } from '$lib/trpc/t';
import { z } from 'zod';
import { GetUserInfoUseCase } from '../../modules/profile/usescases/GetUserInfoUseCase';
import { SQLiteUserProfileRepository } from '../../modules/profile/repositories/SQLiteUserProfileRepository';
import { matcherRouter } from '../../modules/matcher/routes/MatcherRoute';

export const router = t.router({
	matcherRouter,
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
	})
});

export type Router = typeof router;
export const createCaller = t.createCallerFactory(router);
