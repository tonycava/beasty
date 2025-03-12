import { type InputFactory, type OutputFactory, type UseCase, UseCaseResponseBuilder } from '$lib/interfaces/UseCase';
import type { AnimalDto } from '../dto/AnimalDto';
import type { IAnimalRepositoryCreateAnimal } from '../interfaces/IAnimalRepository';
import type { AnimalItem } from '../entities/Animal';

type Input = InputFactory<
	AnimalDto,
	{
		animalRepository: IAnimalRepositoryCreateAnimal;
	}
>;

type Output = OutputFactory<AnimalItem>;

export const CreateAnimalUseCase: UseCase<Input, Output> = (dependencies) => {
	const { animalRepository } = dependencies;

	return {
		execute: async (data: AnimalDto) => {
			const animal = await animalRepository.createAnimal(data);

			if (!animal) {
				return UseCaseResponseBuilder.error(400, "Une erreur est survenue");
			}

			return UseCaseResponseBuilder.success(201, animal);
		}
	};
};