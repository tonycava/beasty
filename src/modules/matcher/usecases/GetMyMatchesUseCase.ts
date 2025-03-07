import {
    type InputFactory,
    type OutputFactory,
    type UseCase,
    UseCaseResponseBuilder
} from '$lib/interfaces/UseCase';

import type { IMatcherRepositoryGet } from '../interfaces/IMatcherRepositoryGet';
import type { Match } from '../entities/Match';

type Input = InputFactory<string, { matcherRepositoryGet: IMatcherRepositoryGet }>;
type Output = OutputFactory<Match[]>;

export const GetMyMatchesUseCase: UseCase<Input, Output> = (dependencies) => {
    const { matcherRepositoryGet } = dependencies;

    return {
        execute: async (animalId) => {
            try {
                if (!animalId) throw new Error("animalId est requis");

                const matches = await matcherRepositoryGet.getMyMatches(animalId);


                return UseCaseResponseBuilder.success(200, matches);
            } catch (error) {
                return UseCaseResponseBuilder.error(500, String(error));
            }
        }
    };
};

