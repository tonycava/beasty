import { type InputFactory, type OutputFactory, type UseCase, UseCaseResponseBuilder } from '$lib/interfaces/UseCase';
import type { AnimalDto } from '../dto/AnimalDto';
import type { IAnimalRepositoryDeleteAnimal } from '../interfaces/IAnimalRepository';

type Input = InputFactory<
	AnimalDto['id'],
	{
		animalRepository: IAnimalRepositoryDeleteAnimal;
	}
>;

type Output = OutputFactory<void>;

export const DeleteAnimalUseCase: UseCase<Input, Output> = (dependencies) => {
	const { animalRepository } = dependencies;

	return {
		execute: async (animalId: string) => {
			try {
				await animalRepository.deleteAnimal(animalId);

				return UseCaseResponseBuilder.success(200, undefined);
			} catch (error) {
				console.error('Error in DeleteAnimalUseCase:', error);
				return UseCaseResponseBuilder.error(500, "Une erreur est survenue lors de la suppression de l'animal");
			}
		}
	};
}