import type { ISQLiteMessageRepository } from '../interfaces/ISQLiteMessageRepository.ts';
import type { UserGetMessagesDto } from '../interfaces/dto/UserGetMessagesDto.ts';
import prisma from '$lib/server/db.ts';
import type { Message } from '../entities/Message.ts';


export const SQLiteMessageRepository = (): ISQLiteMessageRepository => {
	return {
		async getMessages({ senderId, receiverId }: UserGetMessagesDto): Promise<Message[]> {
			return prisma.message.findMany({
				where: { senderId, receiverId }
			});
		}
	};
};
