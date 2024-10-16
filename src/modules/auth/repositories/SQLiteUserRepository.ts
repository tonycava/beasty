import type { User } from '$auth/entities/User';
import type { IUserRepository } from '$auth/interfaces/IUserRepository';
import prisma from '$lib/server/db';

type _SQLiteUserRepository = Omit<IUserRepository, 'getGoogleUserWithAccessToken' | 'getUser'>;

export const SQLiteUserRepository = (): _SQLiteUserRepository => {
	return {
		getApprenticeByEmail(email: string): Promise<User | null> {
			return prisma.user.findFirst({ where: { email } });
		},
		getUserByGoogleId(id): Promise<User | null> {
			return prisma.user.findFirst({ where: { googleUserId: id } });
		},
		async createUser(user): Promise<User> {
			return prisma.user.create({ data: user });
		}
	};
};
