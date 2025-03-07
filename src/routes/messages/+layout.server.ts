import type { LayoutServerLoad } from '../../../.svelte-kit/types/src/routes/$types';
import type { Contact } from './Messages.svelte.ts';

export const load: LayoutServerLoad = () => {
	const contacts: Contact[] = [];
	return {
		contacts
	}
}
