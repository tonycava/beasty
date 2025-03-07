export type Match = {
    animalInitiatorId: string;
    animalMatchedId: string;
    animalInitiator: any;
    animalMatched: any;
	status: any;
    id: string;
};

export type MatchWhitoutId = Omit<Match, 'id'>;