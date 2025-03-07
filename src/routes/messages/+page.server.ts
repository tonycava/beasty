import { type Actions, fail } from '@sveltejs/kit';
import prisma from '$lib/server/db.ts';
import { SQLiteMessageRepository } from '../../modules/beasty/repositories/SQLiteMessageRepository.ts';
import type { PageServerLoad } from './$types';
import { GetUserMessageUseCase } from '../../modules/beasty/usecases/GetUserMessage.ts';
import type { MessageItem } from '../../modules/beasty/entities/Message.ts';
import PrismaToEntity from '../../modules/beasty/entities/mappers/PrismaToEntity.ts';

export const load: PageServerLoad = async ({ locals, url }) => {
	const getUserMessageUseCase = await GetUserMessageUseCase({
		messageRepository: SQLiteMessageRepository()
	}).execute({ senderId: locals.user!.id, receiverId: url.searchParams.get('id')! });

	if (!getUserMessageUseCase.isSuccess) {
		return {
			messages: [] as MessageItem[]
		};
	}

	return {
		messages: getUserMessageUseCase.data as MessageItem[],
	};
};

export const actions: Actions = {
	async sendMessage({ request, locals }) {
		const form = await request.formData();

		const content = form.get('content') as string;
		const selectedContactId = form.get('selectedContactId') as string;
		const userId = locals.user!.id;

		if (!content) return fail(400, { message: 'Un message est requis.' });
		if (!selectedContactId) return fail(400, { message: 'Une erreur est survenue.' });

		const message = await prisma.message.create({
			data: {
				content: content,
				receiver: { connect: { id: selectedContactId } },
				sender: { connect: { id: userId } }
			}
		});

		return { success: true, message: PrismaToEntity.MessagePrismaToMessageEntity(message) };
	}
};
