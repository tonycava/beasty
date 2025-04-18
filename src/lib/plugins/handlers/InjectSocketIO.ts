import { Server } from 'socket.io';
import type { HttpServer } from 'vite';

export default function injectSocketIO(server: HttpServer) {
	const io = new Server(server);

	io.on('connection', (socket) => {
		socket.on('joinChat', (room) => {
			console.log('socket connected: ', socket.id);

			const roomName1 = `senderId=${room.senderId}:receiverId=${room.receiverId}`;
			socket.join(roomName1);
			console.log('User joined room: ', roomName1);

			const roomName2 = `senderId=${room.receiverId}:receiverId=${room.senderId}`;
			socket.join(roomName2);
			console.log('User also joined room: ', roomName2);
		});

		socket.on('leaveChat', (room) => {
			console.log('User left room: ', `senderId=${room.senderId}:receiverId=${room.receiverId}`);
			socket.leave(`senderId=${room.senderId}:receiverId=${room.receiverId}`);
		});

		socket.on('messageSent', (message) => {
			console.log("To room", `senderId=${message.senderId}:receiverId=${message.receiverId}`);

			io.to(`senderId=${message.senderId}:receiverId=${message.receiverId}`)
				.emit('messageReceived', message);

			io.to(`senderId=${message.receiverId}:receiverId=${message.senderId}`)
				.emit('messageReceived', message);
		});

		socket.on('disconnect', () => {
			console.log('User disconnected: ', socket.id);
		});
	});

	console.log('SocketIO injected');
}
