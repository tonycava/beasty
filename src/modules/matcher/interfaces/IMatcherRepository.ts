import type { Animal } from "../entities/Animal";
import type { AnimalItem } from '../../profile/entities/Animal.ts';

export interface IMatcherRepositoryGetAnimals {
    getAnimals(userId: string): Promise<AnimalItem[]>;
}

export interface IMatcherRepositoryGetSelectedAnimal {
    getSelectedAnimal(userId: string): Promise<Animal | null>;
}

export interface IMatcherRepositoryGetAnimalsByUser {
    getAnimalsByUser(userId: string): Promise<{ id: string; firstName: string }[]>;
}


export type IMatcherRepository = IMatcherRepositoryGetAnimals & IMatcherRepositoryGetSelectedAnimal & IMatcherRepositoryGetAnimalsByUser;
