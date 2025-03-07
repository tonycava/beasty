import { UseCaseResponseBuilder, type InputFactory, type OutputFactory, type UseCase } from '$lib/interfaces/UseCase';
import type { Animal } from '../entities/Animal';
import type { IAnimalRepositoryGetAnimalsByUser } from '../interfaces/IAnimalRepository';

type Input = InputFactory<
	string,
	{
		animalRepository: IAnimalRepositoryGetAnimalsByUser;
	}
>;

type Output = OutputFactory<Animal[]>;

export const GetAnimalsByUserUseCase: UseCase<Input, Output> = (dependencies) => {
	const { animalRepository } = dependencies;

	return {
		execute: async (userId) => {
			try {
				const animals = await animalRepository.getAnimalsByUser(userId);

				return UseCaseResponseBuilder.success(200, animals);
			} catch (error) {
				console.error('Error in GetAnimalsByUserUseCase:', error);
				return UseCaseResponseBuilder.error(500, "Une erreur est survenue lors de la récupération des animaux de l'utilisateur");
			}
		}
	};
};