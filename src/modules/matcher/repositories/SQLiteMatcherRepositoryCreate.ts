import prisma from '$lib/server/db';
import type { IMatcherRepositoryCreate } from '../interfaces/IMatcherRepositoryCreate';
import type { Match, MatchStatus } from '../entities/Match';

export const SQLiteMatcherRepositoryCreate = (): IMatcherRepositoryCreate => {
    return {
        createMatch: async (match: Match) => {
            if (!match.animalInitiatorId || !match.animalMatchedId) {
                throw new Error("❌ Les IDs des animaux sont requis pour créer un match.");
            }
        
            try {
                const createdMatch = await prisma.match.create({
                    data: {
                        id: match.id,
                        animalInitiatorId: match.animalInitiatorId,
                        animalMatchedId: match.animalMatchedId,
                        status: match.status, // Vérifie si c'est bien "accepted" ou "rejected"
                    },
                    select: {
                        id: true,
                        animalInitiatorId: true,
                        animalMatchedId: true,
                        status: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                });
        
                return {
                    ...createdMatch,
                    status: createdMatch.status as MatchStatus,
                };
            } catch (error) {
                console.error("❌ Erreur lors de l'insertion dans la base :", error);
                throw new Error("Erreur lors de la création du match en base de données.");
            }
        }
    };
};
