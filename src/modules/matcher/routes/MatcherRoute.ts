import { t } from '$lib/trpc/t';
import { GetMatcherUseCase } from '../usecases/GetMatcherUseCase';
import { CreateMatchUseCase } from '../usecases/CreateMatchUseCase';
import { GetMyMatchesUseCase } from '../usecases/GetMyMatchesUseCase';
import { SQLiteMatcherRepository } from '../repositories/SQLiteMatcherRepository';
import { SQLiteMatcherRepositoryCreate } from '../repositories/SQLiteMatcherRepositoryCreate';
import { SQLiteMatcherRepositoryGet } from '../repositories/SQLiteMatcherRepositoryGet';
import { z } from 'zod';
export const matcherRouter = t.router({
    getMatcher: t.procedure
        .input(z.string().uuid())
        .query(async ({ input }) => {
            const getMatcherUseCase = await GetMatcherUseCase({
                matcherRepository: SQLiteMatcherRepository(),
            }).execute(input);

            if (getMatcherUseCase.isSuccess) {
                return getMatcherUseCase.data;
            }
            return { animals: [], selectedAnimal: null };
        }),

    createMatch: t.procedure
        .input(
            z.object({
                id: z.string().uuid(),
                animalInitiator: z.object({
                    id: z.string().uuid(),
                }),
                animalMatched: z.object({
                    id: z.string().uuid(),
                }),
                status: z.enum(['accepted', 'rejected']),
            })
        )
        .mutation(async ({ input }) => {
            const createMatchUseCase = await CreateMatchUseCase({
                matcherRepositoryCreate: SQLiteMatcherRepositoryCreate(),
            }).execute(input);

            if (createMatchUseCase.isSuccess) {
                return createMatchUseCase.data;
            }

            throw new Error('Erreur lors de la création du match');
        }),

        getMyMatches: t.procedure
        .input(z.string().uuid()) 
        .query(async ({ input }) => {

            const getMyMatchesUseCase = await GetMyMatchesUseCase({
                matcherRepositoryGet: SQLiteMatcherRepositoryGet(),
            }).execute(input);

            if (getMyMatchesUseCase.isSuccess) {
                return getMyMatchesUseCase.data;
            }

            throw new Error("Erreur lors de la récupération des matchs");
        }),

        getAnimalsByUser: t.procedure
        .input(z.string().uuid())
        .query(async ({ input }) => {

            const repository = SQLiteMatcherRepository();
            const animals = await repository.getAnimalsByUser(input);

            return animals;
        }),


});
