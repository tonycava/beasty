import type { User } from "../entities/User";
import prisma from '$lib/server/db';
import type { UserDto } from '../dto/UserDto';
import type { IUserProfileRepository } from '../interfaces/IUserProfileRepository';

type _SQLiteUserProfileRepository = IUserProfileRepository;

export const SQLiteUserProfileRepository = (): _SQLiteUserProfileRepository => {
	return {
		getUser(userId: string): Promise<User | null> {
			return prisma.user.findFirst({ where: { id: userId } });
		},
		async updateUser(user: UserDto): Promise<void> {
			const { id, bio } = user;

			await prisma.user.update({
				where: {
					id
				},
				data: {
					bio: bio
				}
			});
		},
	};
};
