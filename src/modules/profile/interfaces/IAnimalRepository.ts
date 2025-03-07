import type { Animal, AnimalItem } from '../entities/Animal';
import type { AnimalDto } from '../dto/AnimalDto';

export type IAnimalRepositoryCreateAnimal = {
	createAnimal(animal: AnimalDto): Promise<AnimalItem>;
};

export type IAnimalRepositoryGetAnimal = {
	getAnimal(animalId: string): Promise<AnimalItem | null>;
};

export type IAnimalRepositoryGetAnimalsByUser = {
	getAnimalsByUser(userId: string): Promise<AnimalItem[]>;
};

export type IAnimalRepositoryUpdateAnimal = {
	updateAnimal(animal: AnimalItem): Promise<void>;
};

export type IAnimalRepositoryDeleteAnimal = {
	deleteAnimal(animalId: string): Promise<void>;
};

export type IAnimalRepository = IAnimalRepositoryCreateAnimal &
	IAnimalRepositoryGetAnimal &
	IAnimalRepositoryGetAnimalsByUser &
	IAnimalRepositoryUpdateAnimal &
	IAnimalRepositoryDeleteAnimal;
