import { t } from '$lib/trpc/t';
import { GetMatcherUseCase } from '../usecases/GetMatcherUseCase';
import { SQLiteMatcherRepository } from '../repositories/SQLiteMatcherRepository';
import { z } from 'zod';

export const matcherRouter = t.router({
    getMatcher: t.procedure
        .input(
            z.string().uuid()
        )
        .query(async ({ input }) => {
            const getMatcherUseCase = await GetMatcherUseCase({
                matcherRepository: SQLiteMatcherRepository()
            })
                .execute(input);

            if (getMatcherUseCase.isSuccess) {
                return getMatcherUseCase.data
            }
            return [];
        })
});