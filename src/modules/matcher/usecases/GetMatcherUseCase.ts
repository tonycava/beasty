import {
    type InputFactory,
    type OutputFactory,
    type UseCase,
    UseCaseResponseBuilder
} from '$lib/interfaces/UseCase';

import type { IMatcherRepository } from '../interfaces/IMatcherRepository';
import type { Animal } from '../entities/Animal';

type Input = InputFactory<
    string,
    {
        matcherRepository: IMatcherRepository;
    }
>;

type Output = OutputFactory<{ animals: Animal[]; selectedAnimal: Animal | null }>;

export const GetMatcherUseCase: UseCase<Input, Output> = (dependencies) => {
    const { matcherRepository } = dependencies;
    return {
        execute: async (userId) => {
            try {
                const [animals, selectedAnimal] = await Promise.all([
                    matcherRepository.getAnimals(userId),
                    matcherRepository.getSelectedAnimal(userId),
                ]);

                return UseCaseResponseBuilder.success(200, { animals, selectedAnimal });
            } catch (error) {
                return UseCaseResponseBuilder.error(500, String(error));
            }
        }
    };
};
