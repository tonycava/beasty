import type { Match } from '../entities/Match';
import type { Animal } from '../entities/Animal.ts';

export interface IMatcherRepositoryGetMyMatch {
	getMyMatches(animalId: string): Promise<Match[]>;
}

export interface IMatcherRepositoryGetAnimals {
	getMyAnimals(userid: string): Promise<Animal[]>;
}

export type IMatcherRepositoryGet = IMatcherRepositoryGetMyMatch &
	IMatcherRepositoryGetAnimals;
