import { z } from 'zod';

export const userGetMessagesDto = z.object({
	senderId: z.string(),
	receiverId: z.string()
});

export type UserGetMessagesDto = z.infer<typeof userGetMessagesDto>;
