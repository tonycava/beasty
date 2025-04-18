export enum MatchStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected"
}

export type Match = {
    id: string;
    animalInitiatorId: string;
    animalMatchedId: string;
    animalInitiator: any;
    animalMatched: any;
    status: MatchStatus;
    createdAt: Date;
    updatedAt: Date;
};

export type MatchWithoutId = Omit<Match, 'id'>;
