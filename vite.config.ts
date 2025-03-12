import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { webSocketServer } from './src/lib/plugins/WebSocketPluginVite';

export default defineConfig({
	plugins: [sveltekit(), webSocketServer],
});
