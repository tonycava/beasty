// src/lib/api/matcher.ts
import { trpc } from '$lib/clients/client';
import type { Match } from '../../modules/matcher/entities/Match';

export async function getMatcher(userId: string) {
    try {
        return await trpc().matcherRouter.getMatcher.query(userId);
    } catch (error) {
        console.error("Erreur lors de la récupération des animaux :", error);
        return { animals: [], selectedAnimal: null };
    }
}

export async function createMatch(match: Match) {
    try {
        await trpc().matcherRouter.createMatch.mutate(match);
        console.log("Match créé avec succès !");
    } catch (error) {
        console.error("Erreur lors de la création du match :", error);
    }
}
