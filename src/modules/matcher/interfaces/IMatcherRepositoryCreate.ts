import type { Match } from "../entities/Match";

export interface IMatcherRepositoryCreateMatch {
    createMatch(match: Match): Promise<{ 
        id: string; 
        animalInitiatorId: string; 
        animalMatchedId: string; 
        status: string; 
        createdAt: Date; 
        updatedAt: Date; }>;
}

export type IMatcherRepositoryCreate = IMatcherRepositoryCreateMatch;