import type { Match, MatchStatus } from "../entities/Match";

export interface IMatcherRepositoryCreateMatch {
    createMatch(match: Match): Promise<{ 
        id: string; 
        animalInitiatorId: string; 
        animalMatchedId: string; 
        status: MatchStatus; 
        createdAt: Date; 
        updatedAt: Date; 
    }>;
}

export type IMatcherRepositoryCreate = IMatcherRepositoryCreateMatch;
