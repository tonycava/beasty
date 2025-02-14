export type Match = {
    animalMatched: any;
    animalInitiator: any;
	status: any;
    id: string;
};

export type MatchWhitoutId = Omit<Match, 'id'>;