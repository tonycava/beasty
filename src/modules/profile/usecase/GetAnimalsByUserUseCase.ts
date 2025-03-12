import { UseCaseResponseBuilder, type InputFactory, type OutputFactory, type UseCase } from '$lib/interfaces/UseCase';
import type { IAnimalRepositoryGetAnimalsByUser } from '../interfaces/IAnimalRepository';
import type { AnimalItem } from '../entities/Animal';

type Input = InputFactory<
	string,
	{
		animalRepository: IAnimalRepositoryGetAnimalsByUser;
	}
>;

type Output = OutputFactory<AnimalItem[]>;

export const GetAnimalsByUserUseCase: UseCase<Input, Output> = (dependencies) => {
	const { animalRepository } = dependencies;

	return {
		execute: async (userId: string) => {
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