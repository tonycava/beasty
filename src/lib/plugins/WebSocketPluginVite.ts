import injectSocketIO from './handlers/InjectSocketIO';
import type { Plugin } from 'vite';

export const webSocketServer: Plugin = {
	name: 'webSocketServer',
	configureServer(server) {
		injectSocketIO(server.httpServer!);
	}
};
