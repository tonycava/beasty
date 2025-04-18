import { type InputFactory, type OutputFactory, type UseCase, UseCaseResponseBuilder } from '$lib/interfaces/UseCase';
import type { AnimalDto } from '../dto/AnimalDto';
import type { IAnimalRepositoryUpdateAnimal } from '../interfaces/IAnimalRepository';

type Input = InputFactory<
	AnimalDto,
	{
		animalRepository: IAnimalRepositoryUpdateAnimal;
	}
>;

type Output = OutputFactory<void>;

export const UpdateAnimalUseCase: UseCase<Input, Output> = (dependencies) => {
	const { animalRepository } = dependencies;

	return {
		execute: async (data: AnimalDto) => {
			try {
				await animalRepository.updateAnimal(data);

				return UseCaseResponseBuilder.success(200, undefined);
			} catch (error) {
				console.error('Error in UpdateAnimalUseCase:', error);
				return UseCaseResponseBuilder.error(500, "Une erreur est survenue lors de la mise à jour de l'animal");
			}
		}
	};
};