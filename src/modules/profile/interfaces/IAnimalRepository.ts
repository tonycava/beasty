import type { Animal, AnimalItem } from '../entities/Animal';
import type { AnimalDto } from '../dto/AnimalDto';
import type { AnimalEditDto } from '../dto/AnimalEditDto';

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
	updateAnimal(animal: AnimalEditDto): Promise<void>;
};

export type IAnimalRepositoryDeleteAnimal = {
	deleteAnimal(animalId: string): Promise<void>;
};

export type IAnimalRepository = IAnimalRepositoryCreateAnimal &
	IAnimalRepositoryGetAnimal &
	IAnimalRepositoryGetAnimalsByUser &
	IAnimalRepositoryUpdateAnimal &
	IAnimalRepositoryDeleteAnimal;
