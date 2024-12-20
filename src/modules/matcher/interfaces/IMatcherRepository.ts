import type { Animal } from "../entities/Animal";


export interface IMatcherRepositoryGetAnimals {
    getAnimals(userId: string): Promise<Animal[]>;
}

export type IMatcherRepository = IMatcherRepositoryGetAnimals;
