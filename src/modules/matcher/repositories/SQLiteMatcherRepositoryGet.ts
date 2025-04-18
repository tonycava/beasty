import prisma from '$lib/server/db';
import type { IMatcherRepositoryGet } from '../interfaces/IMatcherRepositoryGet';
import { MatchStatus } from '../entities/Match'; // Importation du type MatchStatus
import type { Animal } from '../entities/Animal'; // Importation du type Animal

export const SQLiteMatcherRepositoryGet = (): IMatcherRepositoryGet => {
    return {
        getMyAnimals(userId: string): Promise<Animal[]> {
            return prisma.animal.findMany({
                where: { userId },
            });
        },
        getMyMatches: async (animalId: string) => {
            // Étape 1 : récupérer les matchs acceptés où mon animal est l'initiateur
            const matchesInitiated = await prisma.match.findMany({
                where: {
                    animalInitiatorId: animalId,
                    status: "accepted"
                },
                include: {
                    animalInitiator: { include: { images: true } },
                    animalMatched: { include: { images: true } }
                }
            });
        
            // Étape 2 : filtrer pour ne garder que ceux où l'autre animal a aussi accepté mon animal
            const mutualMatches = [];
        
            for (const match of matchesInitiated) {
                const reciprocalMatch = await prisma.match.findFirst({
                    where: {
                        animalInitiatorId: match.animalMatchedId,
                        animalMatchedId: animalId,
                        status: "accepted"
                    }
                });
        
                if (reciprocalMatch) {
                    mutualMatches.push(match);
                }
            }
        
            return mutualMatches.map(match => ({
                ...match,
                status: match.status as MatchStatus
            }));
        }
        
    };
};
