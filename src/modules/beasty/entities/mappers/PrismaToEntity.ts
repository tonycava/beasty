import type { MessageItem, Message } from '../Message.ts';
import prisma from '$lib/server/db.ts';

const MessagePrismaToMessageItem = async (message: Message): Promise<MessageItem> => {
	const user = await prisma.user.findUnique({
		where: { id: message.senderId },
		select: { id: true, firstName: true, lastName: true, profilePicture: true },
	});

	if (!user) {
		throw new Error(`User with ID ${message.senderId} not found`);
	}

	return {
		id: message.id,
		content: message.content,
		createdAt: message.createdAt,
		receiverId: message.receiverId,
		senderId: message.senderId,
		matchId: message.matchId,
		user: user,
	};
};

export default {
	MessagePrismaToMessageItem,
};