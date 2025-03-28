import prisma from '$lib/server/db';
import type { IMatcherRepositoryGet } from '../interfaces/IMatcherRepositoryGet';
import { MatchStatus } from '../entities/Match'; // Importation du type MatchStatus

export const SQLiteMatcherRepositoryGet = (): IMatcherRepositoryGet => {
    return {
        getMyMatches: async (animalId: string) => {
            // Récupérer tous les matchs acceptés pour l'animal
            const matches = await prisma.match.findMany({
                where: {
                    AND: [
                        {
                            animalInitiatorId: animalId,
                            status: "accepted"
                        },
                        {
                            animalMatchedId: {
                                // Filtrer les animaux déjà matchés ou rejetés
                                notIn: await prisma.match.findMany({
                                    where: {
                                        OR: [
                                            {
                                                animalMatchedId: animalId,
                                                status: "rejected"
                                            },
                                            {
                                                animalInitiatorId: animalId,
                                                status: "rejected"
                                            }
                                        ],
                                    },
                                    select: { animalMatchedId: true, animalInitiatorId: true }
                                }).then(matches => [
                                    ...matches.map(match => match.animalMatchedId),
                                    ...matches.map(match => match.animalInitiatorId)
                                ])
                            }
                        }
                    ]
                },
                include: {
                    animalInitiator: true,
                    animalMatched: true
                }
            });

            // Adapter les données pour correspondre au type Match
            return matches.map(match => ({
                ...match,
                status: match.status as MatchStatus // Conversion explicite du status en MatchStatus
            }));
        }
    };
};
