// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { AuthTokenPayload } from '$auth/entities/JwtPayload';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: AuthTokenPayload | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
