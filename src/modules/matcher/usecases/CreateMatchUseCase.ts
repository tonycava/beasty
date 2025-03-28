import {
    type InputFactory,
    type OutputFactory,
    type UseCase,
    UseCaseResponseBuilder
} from '$lib/interfaces/UseCase';

import type { IMatcherRepositoryCreate } from '../interfaces/IMatcherRepositoryCreate';
import type { Match, MatchStatus } from '../entities/Match';

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
                if (!match.animalInitiatorId || !match.animalMatchedId) {
                    console.error("🚨 Erreur : Les IDs des animaux sont manquants :", match);
                    return UseCaseResponseBuilder.error(400, "IDs d'animaux requis.");
                }
        
                const createdMatch = await matcherRepositoryCreate.createMatch(match);
        
                return UseCaseResponseBuilder.success(201, {
                    ...createdMatch,
                    animalInitiator: match.animalInitiator,
                    animalMatched: match.animalMatched
                });
            } catch (error) {
                console.error("❌ Erreur CreateMatchUseCase :", error);
                return UseCaseResponseBuilder.error(500, String(error));
            }
        }   
    };
};
