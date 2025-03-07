import type { Message } from '@prisma/client';
import type { Message as MessageEntity } from '../Message.ts';

const MessagePrismaToMessageEntity = (message: Message): MessageEntity => {
	return {
		id: message.id,
		content: message.content,
		createdAt: message.createdAt,
		receiverId: message.receiverId,
		senderId: message.senderId
	};
};

export default {
	MessagePrismaToMessageEntity,
};
