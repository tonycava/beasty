import type { UserGetMessagesDto } from './dto/UserGetMessagesDto.ts';

export interface ISQLiteMessageGetMessages {
	getMessages(data: UserGetMessagesDto): Promise<Message[]>;
}

export type ISQLiteMessageRepository = ISQLiteMessageGetMessages;
