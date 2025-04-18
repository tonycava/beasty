import { Server } from 'socket.io';
import type { HttpServer } from 'vite';

export default function injectSocketIO(server: HttpServer) {
	const io = new Server(server);

	io.on('connection', (socket) => {
		socket.on('joinChat', (room) => {
			console.log('socket connected: ', socket.id);
			console.log('User joined room: ', `senderId=${room.senderId}:receiverId=${room.receiverId}`);
			socket.join(`senderId=${room.senderId}:receiverId=${room.receiverId}`);
		});

		socket.on('leaveChat', (room) => {
			console.log('User left room: ', `senderId=${room.senderId}:receiverId=${room.receiverId}`);
			socket.leave(`senderId=${room.senderId}:receiverId=${room.receiverId}`);
		});

		socket.on('messageSent', (message) => {
			console.log("To room", `senderId=${message.senderId}:receiverId=${message.receiverId}`);
			io
				.to(`senderId=${message.senderId}:receiverId=${message.receiverId}`)
				.emit('messageReceived', message);
		});
	});

	console.log('SocketIO injected');
}
