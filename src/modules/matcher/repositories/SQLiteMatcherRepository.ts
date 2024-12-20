import prisma from "$lib/server/db";
import type { IMatcherRepository } from "../interfaces/IMatcherRepository";

type _SQLiteMatcherRepository =IMatcherRepository;

export const SQLiteMatcherRepository = (): _SQLiteMatcherRepository => {
    return {
        getAnimals: async (userId) => {
            return prisma.animal.findMany({
                where: {
                    NOT: [{ userId }]
                }
            });
        }
    };
};
