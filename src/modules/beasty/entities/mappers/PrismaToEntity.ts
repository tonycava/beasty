import type { MessageItem, Message } from '../Message.ts';
import prisma from '$lib/server/db.ts';

const MessagePrismaToMessageItem = async (message: Message): Promise<MessageItem> => {
	const user = await prisma.user.findFirst({
		where: {
			animals: {
				some: {
					sentMessages: {
						some: {
							id: message.id
						}
					},
				}
			}
		},
		select: { id: true, firstName: true, lastName: true, profilePicture: true },
	});
	console.log(user);
	return {
		id: message.id,
		content: message.content,
		createdAt: message.createdAt,
		receiverId: message.receiverId,
		senderId: message.senderId,
		user: user!,
	};
};

export default {
	MessagePrismaToMessageItem,
};
