import {
    type InputFactory,
    type OutputFactory,
    type UseCase,
    UseCaseResponseBuilder
} from '$lib/interfaces/UseCase';

import type { IMatcherRepositoryCreate } from '../interfaces/IMatcherRepositoryCreate';
import type { Match } from '../entities/Match';

type Input = InputFactory<
    Match,  // On attend un objet de type Match
    {
        matcherRepositoryCreate: IMatcherRepositoryCreate;
    }
>;

type Output = OutputFactory<Match>;

export const CreateMatchUseCase: UseCase<Input, Output> = (dependencies) => {
    const { matcherRepositoryCreate } = dependencies;
    
    return {
        execute: async (match) => {
            try {
                // Appel au repository pour créer le match dans la base
                const createdMatch = await matcherRepositoryCreate.createMatch(match);
                return UseCaseResponseBuilder.success(201, {
                    ...createdMatch,
                    animalInitiator: match.animalInitiator,
                    animalMatched: match.animalMatched
                });
            } catch (error) {
                return UseCaseResponseBuilder.error(500, String(error));
            }
        }
    };
};
