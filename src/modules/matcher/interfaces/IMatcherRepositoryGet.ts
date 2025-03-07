import type { Match } from "../entities/Match";

export interface IMatcherRepositoryGetMyMatch {
    getMyMatches(animalId: string): Promise<Match[]>;
}

export type IMatcherRepositoryGet = IMatcherRepositoryGetMyMatch;