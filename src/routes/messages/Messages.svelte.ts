import { writable } from 'svelte/store';

export type Contact = {
	id: string;
	firstName: string;
	lastName: string;
	avatar: string;
	lastMessage?: string;
	isOnline?: boolean;
}

export const selectedContact = writable<Contact | null>(null)
