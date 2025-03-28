import prisma from '$lib/server/db';
import type { IMatcherRepositoryGet } from '../interfaces/IMatcherRepositoryGet';
import type { Animal } from '../entities/Animal.ts';

export const SQLiteMatcherRepositoryGet = (): IMatcherRepositoryGet => {
    return {
        getMyAnimals(userId: string): Promise<Animal[]> {
            return prisma.animal.findMany({
                where: { userId },
            });
        },
        getMyMatches: async (animalId: string) => {
            const matches = await prisma.match.findMany({
                where: {
                    AND: [
                        {
                            animalInitiatorId: animalId,
                            status: "accepted"
                        },
                        {
                            animalMatchedId: {
                                in: await prisma.match.findMany({
                                    where: {
                                        animalMatchedId: animalId,
                                        status: "accepted"
                                    },
                                    select: { animalInitiatorId: true }
                                }).then(matches => matches.map(match => match.animalInitiatorId))
                            }
                        }
                    ]
                },
                include: {
                    animalInitiator: {
                        include: {
                            images:true
                        }
                    },
                    animalMatched: {
                        include: {
                            images:true
                        }
                    }
                }
            });

            return matches;
        }
    };
};


