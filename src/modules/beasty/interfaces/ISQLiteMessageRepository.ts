import type { UserGetMessagesDto } from './dto/UserGetMessagesDto.ts';
import type { Message } from '../entities/Message.ts';

export interface ISQLiteMessageGetMessages {
	getMessages(data: UserGetMessagesDto): Promise<Message[]>;
}

export type ISQLiteMessageRepository = ISQLiteMessageGetMessages;
