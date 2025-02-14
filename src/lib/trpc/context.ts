import prisma from '$lib/server/db';
import type { RequestEvent } from '@sveltejs/kit';
import { GetUserInfoUseCase } from '../../modules/profile/usescases/GetUserInfoUseCase';
import { SQLiteUserProfileRepository } from '../../modules/profile/repositories/SQLiteUserProfileRepository';

export async function createContext(event: RequestEvent) {
	try {
		const session = event.locals.user;
		const user = await GetUserInfoUseCase({
			userRepository: SQLiteUserProfileRepository()
		})
			.execute(session?.id ?? '')
			.then((res) => {
				if (res.isSuccess) return res.data;
				return null;
			})
			.catch(() => null);

		return {
			event,	// 👈 now available in your context
			prisma,
			user
		};
	} catch {
		return { event, prisma, user: null };
	}
}

export type Context = Awaited<ReturnType<typeof createContext>>;
