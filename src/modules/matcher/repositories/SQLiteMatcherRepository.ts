import prisma from "$lib/server/db";
import type { IMatcherRepository } from "../interfaces/IMatcherRepository";

type _SQLiteMatcherRepository = IMatcherRepository;

export const SQLiteMatcherRepository = (): _SQLiteMatcherRepository => {
    return {
        getAnimals: async (userId) => {
            // Récupérer l'animal sélectionné de l'utilisateur
            const selectedAnimal = await prisma.animal.findFirst({
                where: { userId },
                include: { images: true },
            });

            if (!selectedAnimal) {
                return []; // Si aucun animal sélectionné, on ne renvoie rien
            }

            const selectedAnimalId = selectedAnimal.id;

            // Récupérer les IDs des animaux déjà matchés par cet utilisateur
            const matchedAnimalIds = await prisma.match.findMany({
                where: {
                    OR: [
                        { animalInitiatorId: selectedAnimalId },
                        { animalMatchedId: selectedAnimalId },
                    ],
                },
                include: {
                    animalInitiator: {
                        include: { images: true },
                    },
                    animalMatched: {
                        include: { images: true },
                    },
                }
            });

            // Extraire les IDs des animaux à exclure
            const excludedIds = matchedAnimalIds.flatMap(match => [
                match.animalMatchedId,
                match.animalInitiatorId
            ]).filter(id => id !== selectedAnimalId); // On s'assure de ne pas exclure l'animal sélectionné lui-même

            // Retourner les animaux en excluant ceux déjà matchés
            return prisma.animal.findMany({
                where: {
                    NOT: [
                        { id: selectedAnimalId }, // Exclure l’animal de l'utilisateur
                        { id: { in: excludedIds } }, // Exclure les animaux déjà matchés
                    ],
                },
                include: { images: true },
            });
        },

        getSelectedAnimal: async (userId) => {
            return prisma.animal.findFirst({
                where: { userId},
                include: { images: true },
            });
        },

        getAnimalsByUser: async (userId) => {
            return prisma.animal.findMany({
                where: { userId },  // On filtre par l'ID utilisateur
                include: { images: true },
            });
        },
        
    };
};