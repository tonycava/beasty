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
		execute: async (userId) => {
			try {
				if (!userId)
					return UseCaseResponseBuilder.error(500, "L'id de l'utilisateur est obligatoire.");
				const animals = await matcherRepositoryGet.getMyAnimals(userId);

				const matchesPromise = animals.map((animal) =>
					matcherRepositoryGet.getMyMatches(animal.id)
				);

				const matches = await Promise.all(matchesPromise);

				return UseCaseResponseBuilder.success(200, matches.flat());
			} catch (error) {
				return UseCaseResponseBuilder.error(500, String(error));
			}
		}
	};
};
