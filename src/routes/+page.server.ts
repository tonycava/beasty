import type { PageServerLoad } from './$types';
import socket from '$lib/server/socket';

export const load: PageServerLoad = async () => {
	socket.emit('message', 'Hello from the server');

	return {};
};
