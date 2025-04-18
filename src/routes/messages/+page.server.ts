import { type Actions, fail } from '@sveltejs/kit';
import prisma from '$lib/server/db.ts';
import { SQLiteMessageRepository } from '../../modules/beasty/repositories/SQLiteMessageRepository.ts';
import type { PageServerLoad } from './$types';
import { GetUserMessageUseCase } from '../../modules/beasty/usecases/GetUserMessage.ts';
import type { MessageItem } from '../../modules/beasty/entities/Message.ts';
import PrismaToEntity from '../../modules/beasty/entities/mappers/PrismaToEntity.ts';
import socket from '$lib/socket.ts';

export const load: PageServerLoad = async ({ url, locals }) => {
	const senderId = url.searchParams.get('senderId');
	const receiverId = url.searchParams.get('receiverId');

	socket.emit('joinChat', { senderId, receiverId });

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
		const matchId = url.searchParams.get('matchId') as string;

		if (!content) return fail(400, { message: 'Un message est requis.' });

		const senderExists = await prisma.user.findUnique({
			where: { id: senderId }
		});

		const receiverExists = await prisma.user.findUnique({
			where: { id: receiverId }
		});

		if (!senderExists || !receiverExists) {
			return fail(404, { message: 'Utilisateur introuvable.' });
		}

		const messageData: any = {
			content,
			sender: { connect: { id: senderId } },
			receiver: { connect: { id: receiverId } }
		};

		if (matchId) {
			messageData.match = { connect: { id: matchId } };
		}

		try {
			const messageDb = await prisma.message.create({ data: messageData });

			const message = await PrismaToEntity.MessagePrismaToMessageItem(messageDb);

			message["senderId"] = senderId;
			message["receiverId"] = receiverId;
			socket.emit('messageSent', message);

			return { success: true, message };
		} catch (error) {
			console.error('Error creating message:', error);
			return fail(500, { message: 'Erreur lors de l\'envoi du message.' });
		}
	}
};
