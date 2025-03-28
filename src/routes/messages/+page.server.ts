import { type Actions, fail } from '@sveltejs/kit';
import prisma from '$lib/server/db.ts';
import { SQLiteMessageRepository } from '../../modules/beasty/repositories/SQLiteMessageRepository.ts';
import type { PageServerLoad } from './$types';
import { GetUserMessageUseCase } from '../../modules/beasty/usecases/GetUserMessage.ts';
import type { MessageItem } from '../../modules/beasty/entities/Message.ts';
import PrismaToEntity from '../../modules/beasty/entities/mappers/PrismaToEntity.ts';

export const load: PageServerLoad = async ({ url }) => {
	const senderId = url.searchParams.get('senderId');
	const receiverId = url.searchParams.get('receiverId');

	console.log('in load', senderId, receiverId);
	if (!senderId || !receiverId) {
		return { messages: [] as MessageItem[] };
	}
	const getUserMessageUseCase = await GetUserMessageUseCase({
		messageRepository: SQLiteMessageRepository()
	}).execute({ senderId: senderId, receiverId: receiverId });

	if (!getUserMessageUseCase.isSuccess) {
		return { messages: [] as MessageItem[] };
	}

	return {
		messages: await Promise.all(getUserMessageUseCase.data.map(PrismaToEntity.MessagePrismaToMessageItem))
	};
};

export const actions: Actions = {
	async sendMessage({ request, url }) {
		const form = await request.formData();

		const content = form.get('content') as string;
		const senderId = url.searchParams.get('senderId') as string;
		const receiverId = url.searchParams.get('receiverId') as string;

		if (!content) return fail(400, { message: 'Un message est requis.' });

		const message = await prisma.message.create({
			data: {
				content: content,
				receiver: { connect: { id: receiverId } },
				sender: { connect: { id: senderId } }
			}
		});

		return { success: true, message: await PrismaToEntity.MessagePrismaToMessageItem(message) };
	}
};
