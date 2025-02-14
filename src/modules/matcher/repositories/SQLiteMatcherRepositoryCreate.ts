import prisma from '$lib/server/db';
import type { IMatcherRepositoryCreate } from '../interfaces/IMatcherRepositoryCreate';
import type { Match } from '../entities/Match';

export const SQLiteMatcherRepositoryCreate = (): IMatcherRepositoryCreate => {
    return {
        createMatch: async (match: Match) => {
            return prisma.match.create({
                data: {
                    animalInitiatorId: match.animalInitiator.id, // Utilisez l'ID de l'animal initiateur
                    animalMatchedId: match.animalMatched.id,     // Utilisez l'ID de l'animal matché
                    status: match.status,
                }
            });
        }
    };
};
    