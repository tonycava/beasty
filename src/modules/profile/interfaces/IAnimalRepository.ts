import type { Animal } from '../entities/Animal';
import type { AnimalDto } from '../dto/AnimalDto';

export type IAnimalRepositoryCreateAnimal = {
	createAnimal(animal: AnimalDto): Promise<Animal>;
};

export type IAnimalRepositoryGetAnimal = {
	getAnimal(animalId: string): Promise<Animal | null>;
};

export type IAnimalRepositoryGetAnimalsByUser = {
	getAnimalsByUser(userId: string): Promise<Animal[]>;
};

export type IAnimalRepositoryUpdateAnimal = {
	updateAnimal(animal: Animal): Promise<void>;
};

export type IAnimalRepositoryDeleteAnimal = {
	deleteAnimal(animalId: string): Promise<void>;
};

export type IAnimalRepository = IAnimalRepositoryCreateAnimal &
	IAnimalRepositoryGetAnimal &
	IAnimalRepositoryGetAnimalsByUser &
	IAnimalRepositoryUpdateAnimal &
	IAnimalRepositoryDeleteAnimal;
