import type { AuthTokenPayload } from '$auth/entities/JwtPayload.ts';

export type Message = {
	id: string;
	content: string;
	receiverId: string;
	senderId: string;
	createdAt: Date;
	matchId?: string | null;
};

export type MessageItem = Message & {
	user: AuthTokenPayload;
};

export type MessageWithoutId = Omit<Message, 'id'>;