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

type Output = OutputFactory<Animal[]>;

export const GetMatcherUseCase: UseCase<Input, Output> = (dependencies) => {
    const { matcherRepository } = dependencies;
    return {
        execute: async (userId) => {
            try {
                const animals = await matcherRepository.getAnimals(userId);
                return UseCaseResponseBuilder.success(200, animals);
            } catch (error) {
                return UseCaseResponseBuilder.error(500, String(error));
            }
        }
    };
};