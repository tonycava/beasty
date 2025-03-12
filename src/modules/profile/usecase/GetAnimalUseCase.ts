import { UseCaseResponseBuilder, type InputFactory, type OutputFactory, type UseCase } from '$lib/interfaces/UseCase';
import type { AnimalItem } from '../entities/Animal';
import type { IAnimalRepositoryGetAnimal } from '../interfaces/IAnimalRepository';

type Input = InputFactory<
	string,
	{
		animalRepository: IAnimalRepositoryGetAnimal;
	}
>;

type Output = OutputFactory<AnimalItem>;

export const GetAnimalUseCase: UseCase<Input, Output> = (dependencies) => {
	const { animalRepository } = dependencies;

	return {
		execute: async (animalId: string) => {
			try {
				const animal = await animalRepository.getAnimal(animalId);

				if (!animal) {
					return UseCaseResponseBuilder.error(404, "L'animal demandé n'a pas été trouvé");
				}

				return UseCaseResponseBuilder.success(200, animal);
			} catch (error) {
				console.error('Error in GetAnimalUseCase:', error);
				return UseCaseResponseBuilder.error(500, "Une erreur est survenue lors de la récupération de l'animal");
			}
		}
	};
};