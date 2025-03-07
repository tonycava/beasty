import { Server } from 'socket.io';
import type { HttpServer } from 'vite';

export default function injectSocketIO(server: HttpServer) {
	const io = new Server(server);

	io.on('connection', (socket) => {
		const username = `User ${Math.round(Math.random() * 999999)}`;
		socket.emit('name', username);

		socket.on('message', (message: string) => {
			console.log(`Message from ${username}: ${message}`);
			io.emit('message', {
				from: username,
				message: message,
				time: new Date().toLocaleString()
			});
		});
	});

	console.log('SocketIO injected');
}
