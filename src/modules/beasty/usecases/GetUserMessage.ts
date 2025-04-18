import {
	type InputFactory,
	type OutputFactory,
	type UseCase,
	UseCaseResponseBuilder
} from '$lib/interfaces/UseCase';
import type { UserGetMessagesDto } from '../interfaces/dto/UserGetMessagesDto.ts';
import type { ISQLiteMessageGetMessages } from '../interfaces/ISQLiteMessageRepository.ts';
import type { Message } from '../entities/Message.ts';

type Input = InputFactory<
	UserGetMessagesDto,
	{
		messageRepository: ISQLiteMessageGetMessages;
	}
>;

type Output = OutputFactory<Message[]>;

export const GetUserMessageUseCase: UseCase<Input, Output> = (dependencies) => {
	const { messageRepository } = dependencies;
	return {
		async execute(data): Promise<Output> {

			try {
				const messages = await messageRepository.getMessages(data);
				return UseCaseResponseBuilder.success(200, messages);
			} catch (err) {
				console.error('Error :', err);
				return UseCaseResponseBuilder.error(
					400,
					"Quelque chose c'est mal passé veuillez réessayer plus tard."
				);
			}
		}
	};
};
